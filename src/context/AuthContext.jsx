import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("foundit_token"));
  const user = useMemo(() => token ? decodeToken(token) : null, [token]);

  async function login(email, password) {
    const { data } = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("foundit_token", data.token);
    setToken(data.token);
    return data;
  }

  async function register(name, email, password) {
    // Do not send a role from the browser. The backend should assign "student".
    return api.post("/api/auth/register", { name, email, password });
  }

  function logout() {
    localStorage.removeItem("foundit_token");
    setToken(null);
  }

  const value = { token, user, login, register, logout, isAuthenticated: Boolean(token) };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}