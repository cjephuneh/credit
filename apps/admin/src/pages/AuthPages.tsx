import { Link } from "react-router-dom";
import {
  Zap,
  Mail,
  Lock,
  User,
  Tag,
  FileText,
  ShieldCheck,
  Banknote,
  Megaphone,
  Info,
  ArrowRight,
  KeyRound,
  ScrollText,
  UserCheck,
} from "lucide-react";

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Zap size={22} color="#facc15" />
            </div>
            <div>
              <div className="auth-brand-name">YES CREDIT</div>
              <div className="auth-brand-sub">Admin Portal</div>
            </div>
          </div>

          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to manage loans, KYC, collections, and campaigns.</p>

          <div className="field">
            <label>Work Email</label>
            <div className="input-wrap">
              <Mail size={16} color="var(--muted)" />
              <input type="email" placeholder="ops@yescredit.co.ke" />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={16} color="var(--muted)" />
              <input type="password" placeholder="Enter password" />
            </div>
          </div>

          <button className="btn-primary">
            Sign In <ArrowRight size={16} />
          </button>

          <div className="auth-links">
            <Link to="/auth/forgot">Forgot password?</Link>
            <Link to="/auth/register">Create admin account</Link>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-panel">
          <h2>Portfolio Command Center</h2>
          {[
            { Icon: FileText,   title: "Real-time loan triage",    desc: "Approve, reject, or escalate loan requests with full applicant context." },
            { Icon: ShieldCheck, title: "KYC risk monitoring",     desc: "Flag mismatches, duplicates, and fraud signals before disbursement." },
            { Icon: Banknote,   title: "Collections workflows",    desc: "Track PAR buckets, promises to pay, and recovery rates in one view." },
            { Icon: Megaphone,  title: "Campaign automation",      desc: "Run repayment reminders, top-up offers, and referral campaigns." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="auth-panel-item">
              <div className="auth-panel-dot">
                <Icon size={15} color="var(--brand-light)" />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Zap size={22} color="#facc15" />
            </div>
            <div>
              <div className="auth-brand-name">YES CREDIT</div>
              <div className="auth-brand-sub">Invite-only onboarding</div>
            </div>
          </div>

          <h1>Create admin profile</h1>
          <p className="subtitle">Fill in your details to request access to the portal.</p>

          <div className="field">
            <label>Full Name</label>
            <div className="input-wrap">
              <User size={16} color="var(--muted)" />
              <input placeholder="Loan Officer Name" />
            </div>
          </div>

          <div className="field">
            <label>Work Email</label>
            <div className="input-wrap">
              <Mail size={16} color="var(--muted)" />
              <input type="email" placeholder="name@yescredit.co.ke" />
            </div>
          </div>

          <div className="field">
            <label>Team Role</label>
            <div className="input-wrap">
              <Tag size={16} color="var(--muted)" />
              <select defaultValue="loan-officer">
                <option value="loan-officer">Loan Officer</option>
                <option value="kyc-analyst">KYC Analyst</option>
                <option value="collections">Collections Agent</option>
                <option value="debt-collector">Debt Collector</option>
                <option value="compliance">Compliance Officer</option>
                <option value="risk">Risk Analyst</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>
          </div>

          <button className="btn-primary">
            Request Access <ArrowRight size={16} />
          </button>

          <div className="auth-links">
            <Link to="/auth/login">Back to login</Link>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-panel">
          <h2>Secure by Design</h2>
          {[
            { Icon: KeyRound,   title: "Role-based permissions", desc: "Every module is gated by role. Loan officers can't touch audit logs." },
            { Icon: ScrollText, title: "Immutable audit trail",  desc: "Every action is logged with actor, timestamp, and resource ID." },
            { Icon: UserCheck,  title: "2FA-ready auth",         desc: "Supports TOTP and SMS-based two-factor authentication." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="auth-panel-item">
              <div className="auth-panel-dot">
                <Icon size={15} color="var(--brand-light)" />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Zap size={22} color="#facc15" />
            </div>
            <div>
              <div className="auth-brand-name">YES CREDIT</div>
              <div className="auth-brand-sub">Account recovery</div>
            </div>
          </div>

          <h1>Reset your password</h1>
          <p className="subtitle">Enter your work email and we'll send a secure reset link.</p>

          <div className="field">
            <label>Work Email</label>
            <div className="input-wrap">
              <Mail size={16} color="var(--muted)" />
              <input type="email" placeholder="ops@yescredit.co.ke" />
            </div>
          </div>

          <div className="info-box blue">
            <Info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Reset links expire after 15 minutes and can only be used once.</span>
          </div>

          <button className="btn-primary">
            Send Reset Link <ArrowRight size={16} />
          </button>

          <div className="auth-links">
            <Link to="/auth/login">← Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
