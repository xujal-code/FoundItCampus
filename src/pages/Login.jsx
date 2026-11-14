import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form.email.trim(), form.password); navigate("/"); }
    catch (err) { setError(getErrorMessage(err)); }
    finally { setLoading(false); }
  }

  return <div className="auth-page">
    <div className="auth-visual">
      <Link to="/login" className="brand brand-light"><span className="brand-mark"><Search size={21}/></span><span>FoundIt<span className="brand-campus">Campus</span></span></Link>
      <div className="auth-visual-copy"><span className="eyebrow light-eyebrow">YOUR CAMPUS. ONE COMMUNITY.</span><h1>Lost something?<br/><em>Found your people.</em></h1><p>A smarter way to reconnect lost belongings with the people they belong to.</p></div>
      <div className="visual-footer"><ShieldCheck size={16}/> Built for a safer, more connected campus.</div>
    </div>
    <div className="auth-form-side">
      <div className="auth-form-box">
        <div className="mobile-auth-brand"><span className="brand-mark"><Search size={20}/></span> FoundIt Campus</div>
        <span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p className="muted">Pick up right where you left off.</p>
        <form onSubmit={submit} className="form-stack">
          <label>Email address<input type="email" required autoComplete="email" placeholder="you@college.edu" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
          <label>Password<input type="password" required autoComplete="current-password" placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
          {error && <div className="alert error">{error}</div>}
          <button className="button button-primary full-button" disabled={loading}>{loading ? "Signing in..." : "Sign in"} <ArrowRight size={17}/></button>
        </form>
        <p className="auth-switch">New to FoundIt? <Link to="/register">Create an account</Link></p>
        <p className="auth-footnote">By continuing, you agree to use FoundIt Campus responsibly.</p>
      </div>
    </div>
  </div>;
}