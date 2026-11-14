import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("foundit_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function imageSrc(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

export default api;