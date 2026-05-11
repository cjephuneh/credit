import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Banknote,
  Users,
  Megaphone,
  BarChart2,
  ScrollText,
  Settings,
  Zap,
  LogOut,
  Bell,
  UserCheck,
} from "lucide-react";

const menu = [
  { to: "/app/overview",      label: "Overview",      Icon: LayoutDashboard, badge: null },
  { to: "/app/loan-requests", label: "Loan Requests", Icon: FileText,         badge: "12" },
  { to: "/app/kyc",           label: "KYC Console",   Icon: ShieldCheck,      badge: "17" },
  { to: "/app/collections",   label: "Collections",   Icon: Banknote,         badge: null },
  { to: "/app/borrowers",     label: "Borrowers",     Icon: UserCheck,        badge: null },
  { to: "/app/users",         label: "Team Users",    Icon: Users,            badge: null },
  { to: "/app/campaigns",     label: "Campaigns",     Icon: Megaphone,        badge: null },
  { to: "/app/reports",       label: "Reports",       Icon: BarChart2,        badge: null },
  { to: "/app/audit",         label: "Audit Logs",    Icon: ScrollText,       badge: null },
  { to: "/app/settings",      label: "Settings",      Icon: Settings,         badge: null },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Zap size={18} color="#facc15" />
          </div>
          <div>
            <div className="sidebar-brand-name">YES CREDIT</div>
            <div className="sidebar-brand-sub">Admin Portal</div>
          </div>
        </div>

        <div className="nav-section-label">Main</div>
        {menu.slice(0, 6).map(({ to, label, Icon, badge }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Icon size={16} className="nav-icon" />
            {label}
            {badge && <span className="nav-badge">{badge}</span>}
          </NavLink>
        ))}

        <div className="nav-section-label">Tools</div>
        {menu.slice(6).map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Icon size={16} className="nav-icon" />
            {label}
          </NavLink>
        ))}

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">JO</div>
            <div style={{ flex: 1 }}>
              <div className="sidebar-user-name">James Otieno</div>
              <div className="sidebar-user-role">Loan Officer</div>
            </div>
            <Bell size={14} color="var(--muted2)" />
          </div>
          <button className="nav-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>
            <LogOut size={16} className="nav-icon" />
            Sign out
          </button>
        </div>
      </aside>

      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}
