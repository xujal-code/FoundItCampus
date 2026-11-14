import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../services/api";

export default function Register() {
  const { register } = useAuth(); const navigate = useNavigate();
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [error,setError] = useState(""); const [success,setSuccess] = useState(""); const [loading,setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault(); setError(""); setSuccess(""); setLoading(true);
    try { await register(form.name.trim(),form.email.trim(),form.password); setSuccess("Account created. You can now sign in."); setTimeout(()=>navigate("/login"),900); }
    catch(err) { setError(getErrorMessage(err)); }
    finally { setLoading(false); }
  }
  return <div className="auth-page">
    <div className="auth-visual"><Link to="/login" className="brand brand-light"><span className="brand-mark"><Search size={21}/></span><span>FoundIt<span className="brand-campus">Campus</span></span></Link><div className="auth-visual-copy"><span className="eyebrow light-eyebrow">GOOD THINGS FIND THEIR WAY BACK</span><h1>Be part of a<br/><em>helpful campus.</em></h1><p>Join your campus community and help make lost-and-found simpler for everyone.</p></div><div className="visual-footer">✦ &nbsp; Find it. Claim it. Return it.</div></div>
    <div className="auth-form-side"><div className="auth-form-box"><div className="mobile-auth-brand"><span className="brand-mark"><Search size={20}/></span> FoundIt Campus</div><span className="eyebrow">GET STARTED</span><h2>Create your account</h2><p className="muted">Use your college email to join the community.</p>
      <form onSubmit={submit} className="form-stack">
        <label>Full name<input required minLength="2" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>College email<input type="email" required placeholder="you@college.edu" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<input type="password" required minLength="6" placeholder="At least 6 characters" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
        {error && <div className="alert error">{error}</div>}{success && <div className="alert success">{success}</div>}
        <button className="button button-primary full-button" disabled={loading}>{loading?"Creating account...":"Create account"} <ArrowRight size={17}/></button>
      </form><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p><p className="auth-footnote">Your account is created with the student role.</p>
    </div></div>
  </div>;
}