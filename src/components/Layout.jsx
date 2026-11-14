import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, Compass, FilePlus2, LayoutDashboard, LogOut, Package, Search, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Explore items", icon: Compass, end: true },
  { to: "/report", label: "Report an item", icon: FilePlus2 },
  { to: "/my-items", label: "My reports", icon: Package },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export default function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-mark"><Search size={21} /></span>
          <span>FoundIt<span className="brand-campus">Campus</span></span>
        </NavLink>
        <div className="side-label">WORKSPACE</div>
        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={18} /><span>{label}</span>
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <ShieldCheck size={18} /><span>Admin</span>
            </NavLink>
          )}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <strong>Lost something?</strong>
            <p>Report it and let the campus community help.</p>
            <NavLink to="/report">Create a report <span>→</span></NavLink>
          </div>
          <button className="nav-link logout-button" onClick={handleLogout}><LogOut size={18} />Sign out</button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><Search size={18}/></span> FoundIt Campus</div>
          <div className="topbar-spacer" />
          <span className="online-dot" />
          <span className="topbar-caption">Campus community</span>
          <div className="avatar">{user?.userId ? "S" : "U"}</div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  );
}