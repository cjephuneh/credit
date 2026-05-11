import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TrendingUp, TrendingDown, Users, FileText, ShieldCheck, Banknote,
  Star, AlertTriangle, CheckCircle, Clock, Download, Plus, Filter,
  Eye, X, Check, RefreshCw, Phone, MessageSquare, BarChart2,
  Zap, Lock, Fingerprint, Webhook, Wrench, Shield,
  UserCog, UserX, Mail, Calendar, ChevronRight, Search,
  BadgeCheck, Scale, Gavel, UserCheck, Briefcase, HeadphonesIcon,
  AlertCircle, Activity, ArrowUpRight, ArrowDownRight, ArrowLeft,
  CreditCard, MapPin, Hash, Building,
} from "lucide-react";

/* ─────────────────────────────────────────
   SHARED DATA
───────────────────────────────────────── */
const applications = [
  { id: "LN-1002", user: "James Otieno",  userId: "USR-001", amount: "KES 50,000",  product: "Market Bond",    risk: "medium", status: "Pending", score: 68, date: "11 May", purpose: "Business capital", tenure: "6 months", phone: "+254712000111", mpesa: "+254712000111" },
  { id: "LN-1005", user: "Grace Wambui",  userId: "USR-002", amount: "KES 120,000", product: "Logbook Loan",   risk: "high",   status: "Review",  score: 42, date: "11 May", purpose: "Asset purchase",   tenure: "24 months", phone: "+254723000222", mpesa: "+254723000222" },
  { id: "LN-1007", user: "David Kiptoo",  userId: "USR-003", amount: "KES 35,000",  product: "Salary Loan",    risk: "low",    status: "Pending", score: 88, date: "10 May", purpose: "School fees",      tenure: "12 months", phone: "+254734000333", mpesa: "+254734000333" },
  { id: "LN-1009", user: "Aisha Mwangi",  userId: "USR-004", amount: "KES 80,000",  product: "Group Loan",     risk: "low",    status: "Pending", score: 79, date: "10 May", purpose: "Business capital", tenure: "18 months", phone: "+254745000444", mpesa: "+254745000444" },
  { id: "LN-1011", user: "Peter Njoroge", userId: "USR-005", amount: "KES 200,000", product: "Boda Financing", risk: "high",   status: "Review",  score: 38, date: "9 May",  purpose: "Asset purchase",   tenure: "24 months", phone: "+254756000555", mpesa: "+254756000555" },
];

const kycQueue = [
  { id: "USR-2881", name: "Grace Wambui",    flag: "ID mismatch",        risk: "high",   submitted: "11 May 09:12" },
  { id: "USR-3102", name: "Samuel Odhiambo", flag: "Duplicate document", risk: "high",   submitted: "11 May 08:44" },
  { id: "USR-3210", name: "Fatuma Hassan",   flag: "Selfie mismatch",    risk: "medium", submitted: "10 May 17:30" },
  { id: "USR-3301", name: "Brian Mutua",     flag: "Pending review",     risk: "low",    submitted: "10 May 14:15" },
];

const auditLogs = [
  { time: "10:14 AM", actor: "James Otieno",  role: "Loan Officer",  action: "Approved loan",           resource: "LN-1002",     type: "success" },
  { time: "10:09 AM", actor: "Amina Yusuf",   role: "KYC Analyst",   action: "Resubmission requested",  resource: "USR-2881",    type: "warning" },
  { time: "09:57 AM", actor: "Collins Ouma",  role: "Collections",   action: "Promise to pay recorded", resource: "USR-1037",    type: "blue"    },
  { time: "09:41 AM", actor: "James Otieno",  role: "Loan Officer",  action: "Rejected loan",           resource: "LN-1005",     type: "danger"  },
  { time: "09:22 AM", actor: "System",        role: "Automation",    action: "Repayment reminder sent", resource: "Campaign-04", type: "muted"   },
];

type Role = { id: string; label: string; color: string; Icon: React.FC<{ size?: number; color?: string }> };
const ROLES: Role[] = [
  { id: "super-admin",    label: "Super Admin",        color: "#facc15", Icon: Shield        },
  { id: "loan-officer",   label: "Loan Officer",       color: "#3b82f6", Icon: FileText      },
  { id: "kyc-analyst",    label: "KYC Analyst",        color: "#22c55e", Icon: ShieldCheck   },
  { id: "collections",    label: "Collections Agent",  color: "#f97316", Icon: Banknote      },
  { id: "debt-collector", label: "Debt Collector",     color: "#ef4444", Icon: Gavel         },
  { id: "compliance",     label: "Compliance Officer", color: "#a78bfa", Icon: Scale         },
  { id: "risk-analyst",   label: "Risk Analyst",       color: "#06b6d4", Icon: Activity      },
  { id: "support",        label: "Support Agent",      color: "#ec4899", Icon: HeadphonesIcon },
];

const TEAM_MEMBERS = [
  { id: "USR-001", name: "James Otieno",   email: "j.otieno@yescredit.co.ke",  role: "loan-officer",   status: "active",   joined: "Jan 2025", lastActive: "Today",  loans: 142, kyc: 0,  collections: 0,  phone: "+254712000111", location: "Nairobi" },
  { id: "USR-002", name: "Amina Yusuf",    email: "a.yusuf@yescredit.co.ke",   role: "kyc-analyst",    status: "active",   joined: "Feb 2025", lastActive: "Today",  loans: 0,   kyc: 89, collections: 0,  phone: "+254723000222", location: "Mombasa" },
  { id: "USR-003", name: "Collins Ouma",   email: "c.ouma@yescredit.co.ke",    role: "collections",    status: "active",   joined: "Mar 2025", lastActive: "2h ago", loans: 0,   kyc: 0,  collections: 61, phone: "+254734000333", location: "Kisumu"  },
  { id: "USR-004", name: "Beatrice Njeri", email: "b.njeri@yescredit.co.ke",   role: "compliance",     status: "active",   joined: "Jan 2025", lastActive: "Today",  loans: 0,   kyc: 0,  collections: 0,  phone: "+254745000444", location: "Nairobi" },
  { id: "USR-005", name: "Kevin Mwangi",   email: "k.mwangi@yescredit.co.ke",  role: "debt-collector", status: "active",   joined: "Apr 2025", lastActive: "1h ago", loans: 0,   kyc: 0,  collections: 29, phone: "+254756000555", location: "Nakuru"  },
  { id: "USR-006", name: "Sandra Achieng", email: "s.achieng@yescredit.co.ke", role: "risk-analyst",   status: "active",   joined: "Feb 2025", lastActive: "Today",  loans: 0,   kyc: 0,  collections: 0,  phone: "+254767000666", location: "Nairobi" },
  { id: "USR-007", name: "Peter Kamau",    email: "p.kamau@yescredit.co.ke",   role: "support",        status: "inactive", joined: "May 2025", lastActive: "3d ago", loans: 0,   kyc: 0,  collections: 0,  phone: "+254778000777", location: "Eldoret" },
  { id: "USR-008", name: "Admin Root",     email: "admin@yescredit.co.ke",     role: "super-admin",    status: "active",   joined: "Jan 2025", lastActive: "Today",  loans: 0,   kyc: 0,  collections: 0,  phone: "+254789000888", location: "Nairobi" },
];

/* ─────────────────────────────────────────
   LINE CHART COMPONENT
───────────────────────────────────────── */
type LineChartProps = {
  datasets: { label: string; color: string; data: number[] }[];
  labels: string[];
  height?: number;
};

function LineChart({ datasets, labels, height = 160 }: LineChartProps) {
  const W = 600; const H = height;
  const PAD = { top: 16, right: 16, bottom: 28, left: 40 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const allVals = datasets.flatMap((d) => d.data);
  const minV = Math.min(...allVals) * 0.9;
  const maxV = Math.max(...allVals) * 1.1;
  const range = maxV - minV || 1;

  const xStep = chartW / (labels.length - 1);
  const toX = (i: number) => PAD.left + i * xStep;
  const toY = (v: number) => PAD.top + chartH - ((v - minV) / range) * chartH;

  const gridLines = 4;

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" style={{ height }}>
        {/* Grid */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = PAD.top + (chartH / gridLines) * i;
          const val = maxV - (range / gridLines) * i;
          return (
            <g key={i}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} className="chart-grid-line" strokeDasharray="4 4" />
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" className="chart-label">{Math.round(val / 1000)}K</text>
            </g>
          );
        })}
        {/* X labels */}
        {labels.map((l, i) => (
          <text key={l} x={toX(i)} y={H - 4} textAnchor="middle" className="chart-label">{l}</text>
        ))}
        {/* Lines + areas */}
        {datasets.map(({ color, data }) => {
          const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
          const areaPath = `M${toX(0)},${toY(data[0])} ` +
            data.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ") +
            ` L${toX(data.length - 1)},${PAD.top + chartH} L${toX(0)},${PAD.top + chartH} Z`;
          return (
            <g key={color}>
              <path d={areaPath} fill={color} className="chart-area" />
              <polyline points={pts} className="chart-line" stroke={color} />
              {data.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toY(v)} r={4} fill={color} className="chart-dot" />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        {datasets.map(({ label, color }) => (
          <div key={label} className="chart-legend-item">
            <div className="chart-legend-dot" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCORE RING
───────────────────────────────────────── */
function ScoreRing({ score, max = 100, color, size = 80 }: { score: number; max?: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / max) * circ;
  return (
    <div className="score-ring-wrap">
      <svg width={size} height={size} className="score-ring-svg">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={8} className="score-ring-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={8} stroke={color}
          className="score-ring-fill" fill="none" strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`} />
        <text x={size / 2} y={size / 2} className="score-ring-label"
          style={{ fill: color, fontSize: size * 0.22, fontWeight: 900, fontFamily: "Inter,sans-serif" }}>
          {score}
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   EXPORT MODAL
───────────────────────────────────────── */
function ExportModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Export Data</span>
          <button className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <p style={{ color: "var(--muted2)", fontSize: 14 }}>Choose format and date range for your export.</p>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Format</label>
              <select className="form-input">
                <option>CSV</option><option>Excel (.xlsx)</option><option>PDF</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Date Range</label>
              <select className="form-input">
                <option>Last 7 days</option><option>Last 30 days</option><option>This month</option><option>Custom</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Include Columns</label>
            {["ID", "Applicant", "Amount", "Product", "Risk Score", "Status", "Date"].map((col) => (
              <label key={col} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", color: "var(--text)", fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "var(--yellow)" }} /> {col}
              </label>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}><Download size={14} /> Export Now</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NEW LOAN ENTRY MODAL
───────────────────────────────────────── */
function NewLoanModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">New Manual Loan Entry</span>
          <button className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="info-box yellow">
            <AlertTriangle size={14} style={{ flexShrink: 0 }} />
            <span>Manual entries bypass the automated scoring pipeline. Ensure all details are verified.</span>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Applicant Name</label>
              <input className="form-input" placeholder="Full name" />
            </div>
            <div className="form-field">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+254 7XX XXX XXX" />
            </div>
            <div className="form-field">
              <label className="form-label">Loan Product</label>
              <select className="form-input">
                <option>Salary Loan</option><option>Market Bond</option><option>Boda Financing</option><option>Group Loan</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Amount (KES)</label>
              <input className="form-input" type="number" placeholder="e.g. 50000" />
            </div>
            <div className="form-field">
              <label className="form-label">Tenure</label>
              <select className="form-input">
                <option>3 months</option><option>6 months</option><option>12 months</option><option>18 months</option><option>24 months</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Purpose</label>
              <select className="form-input">
                <option>Business capital</option><option>School fees</option><option>Medical</option><option>Asset purchase</option><option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Notes</label>
            <textarea className="form-input" rows={3} placeholder="Reason for manual entry..." style={{ resize: "vertical" }} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}><Check size={14} /> Submit Entry</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   INVITE USER MODAL
───────────────────────────────────────── */
function InviteUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Invite Team Member</span>
          <button className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="e.g. Jane Wanjiku" />
            </div>
            <div className="form-field">
              <label className="form-label">Work Email</label>
              <input className="form-input" type="email" placeholder="name@yescredit.co.ke" />
            </div>
            <div className="form-field">
              <label className="form-label">Role</label>
              <select className="form-input">
                {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Department</label>
              <input className="form-input" placeholder="e.g. Credit Risk" />
            </div>
            <div className="form-field">
              <label className="form-label">Phone</label>
              <input className="form-input" placeholder="+254 7XX XXX XXX" />
            </div>
            <div className="form-field">
              <label className="form-label">Location / Branch</label>
              <input className="form-input" placeholder="e.g. Nairobi HQ" />
            </div>
          </div>
          <div className="info-box blue">
            <Mail size={14} style={{ flexShrink: 0 }} />
            <span>An invite email will be sent. The user must accept within 48 hours.</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onClose}><Mail size={14} /> Send Invite</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   OVERVIEW PAGE
───────────────────────────────────────── */
export function OverviewPage() {
  const disbursementData = [12, 18, 14, 22, 19, 28, 24, 31, 27, 38, 34, 42].map((v) => v * 1000);
  const repaymentData   = [10, 15, 12, 19, 17, 24, 21, 27, 23, 33, 30, 37].map((v) => v * 1000);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Portfolio Command Center</h1>
          <p>Monitor demand, risk, disbursement, and repayment performance in real time.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Calendar size={14} /> May 2026</button>
          <button className="btn-primary"><Download size={14} /> Export Report</button>
        </div>
      </div>

      <div className="kpi-grid">
        {[
          { label: "Total Users",           value: "10,842",    trend: "+6.2%",  up: true,  Icon: Users,       color: "blue"   },
          { label: "Pending Loans",         value: "742",       trend: "+14.1%", up: false, Icon: FileText,    color: "yellow" },
          { label: "Outstanding Portfolio", value: "KES 38.2M", trend: "+2.9%",  up: true,  Icon: TrendingUp,  color: "green"  },
          { label: "Repayment Rate",        value: "89.4%",     trend: "+1.7%",  up: true,  Icon: CheckCircle, color: "purple" },
        ].map(({ label, value, trend, up, Icon, color }) => (
          <div key={label} className={`kpi-card ${color}`}>
            <div className="kpi-icon" style={{ background: color === "yellow" ? "var(--yellow-glow)" : color === "green" ? "var(--success-bg)" : color === "purple" ? "rgba(167,139,250,0.12)" : "var(--brand-glow)" }}>
              <Icon size={18} color={color === "yellow" ? "var(--yellow)" : color === "green" ? "var(--success)" : color === "purple" ? "var(--purple)" : "var(--brand-light)"} />
            </div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
            <div className={`kpi-trend ${up ? "up" : "down"}`}>
              {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {trend} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Disbursement vs Repayment Trend</div>
            <div className="panel-sub">12-month portfolio performance (KES thousands)</div>
          </div>
        </div>
        <LineChart
          datasets={[
            { label: "Disbursement", color: "#3b82f6", data: disbursementData },
            { label: "Repayment",    color: "#22c55e", data: repaymentData    },
          ]}
          labels={months}
          height={180}
        />
      </div>

      <div className="panel">
        <div className="panel-header">
          <div><div className="panel-title">Priority Actions</div><div className="panel-sub">Items requiring immediate attention</div></div>
        </div>
        <div className="badges">
          <span className="chip yellow"><Clock size={12} /> 53 approvals due in &lt;2h</span>
          <span className="chip warning"><ShieldCheck size={12} /> 17 KYC reviews pending</span>
          <span className="chip danger"><AlertTriangle size={12} /> 12 accounts 30+ days overdue</span>
          <span className="chip success"><CheckCircle size={12} /> 8 disbursements ready</span>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent Loan Requests</div>
            <a href="/app/loan-requests" style={{ color: "var(--brand-light)", fontSize: 13, fontWeight: 700 }}>View all</a>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Risk</th><th>Status</th></tr></thead>
              <tbody>
                {applications.slice(0, 3).map((a) => (
                  <tr key={a.id}>
                    <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{a.id}</td>
                    <td>{a.user}</td>
                    <td style={{ fontWeight: 700 }}>{a.amount}</td>
                    <td><span className={`pill ${a.risk}`}>{a.risk}</span></td>
                    <td><span className="pill muted">{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Portfolio Health</div></div>
          {[
            { label: "Disbursement MTD", value: "KES 12.8M", pct: 74, color: "#3b82f6" },
            { label: "Repayment Rate",   value: "89.4%",     pct: 89, color: "#22c55e" },
            { label: "PAR30",            value: "6.3%",      pct: 6,  color: "#ef4444" },
            { label: "KYC Approval",     value: "91.2%",     pct: 91, color: "#facc15" },
          ].map((item) => (
            <div key={item.label} className="progress-wrap" style={{ marginBottom: 14 }}>
              <div className="progress-label-row">
                <span className="progress-label">{item.label}</span>
                <span className="progress-value">{item.value}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   LOAN REQUESTS PAGE
───────────────────────────────────────── */
export function LoanRequestsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [showExport, setShowExport] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const filters = ["All", "Pending", "Review", "Approved", "Rejected"];
  const getStatus = (id: string, orig: string) => statuses[id] ?? orig;
  const filtered = applications.filter((a) => filter === "All" || getStatus(a.id, a.status) === filter);

  const approve = (id: string) => setStatuses((p) => ({ ...p, [id]: "Approved" }));
  const reject  = (id: string) => setStatuses((p) => ({ ...p, [id]: "Rejected" }));

  return (
    <>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      {showNew    && <NewLoanModal onClose={() => setShowNew(false)} />}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Loan Requests</h1>
          <p>Review, approve, or escalate incoming loan applications.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary" onClick={() => setShowExport(true)}><Download size={14} /> Export CSV</button>
          <button className="btn-primary" onClick={() => setShowNew(true)}><Plus size={14} /> New Manual Entry</button>
        </div>
      </div>

      <div className="stat-row">
        {[
          { label: "Total Requests", value: "742" },
          { label: "Pending",        value: "53"  },
          { label: "Under Review",   value: "17"  },
          { label: "Approved Today", value: "28"  },
          { label: "Rejected Today", value: "6"   },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-item-value">{s.value}</div>
            <div className="stat-item-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Risk trend chart */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Application Volume (Last 8 Weeks)</div>
        </div>
        <LineChart
          datasets={[
            { label: "Applications", color: "#3b82f6", data: [88, 102, 94, 118, 107, 132, 121, 142].map((v) => v * 1000) },
            { label: "Approved",     color: "#22c55e", data: [71, 84,  76, 98,  89,  110, 101, 119].map((v) => v * 1000) },
          ]}
          labels={["Wk1","Wk2","Wk3","Wk4","Wk5","Wk6","Wk7","Wk8"]}
          height={150}
        />
      </div>

      <div className="badges">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className="chip"
            style={filter === f ? { background: "var(--yellow-glow)", borderColor: "rgba(202,138,4,0.3)", color: "var(--yellow)" } : {}}>
            {f}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Loan ID</th><th>Applicant</th><th>Amount</th><th>Product</th><th>Risk Score</th><th>Risk</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const st = getStatus(item.id, item.status);
                return (
                  <tr key={item.id}>
                    <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{item.id}</td>
                    <td style={{ fontWeight: 700 }}>{item.user}</td>
                    <td style={{ fontWeight: 700 }}>{item.amount}</td>
                    <td>{item.product}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 4, background: "var(--border)", borderRadius: 999, overflow: "hidden", minWidth: 60 }}>
                          <div style={{ width: `${item.score}%`, height: "100%", background: item.score > 70 ? "var(--success)" : item.score > 50 ? "var(--warning)" : "var(--danger)", borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted2)", minWidth: 24 }}>{item.score}</span>
                      </div>
                    </td>
                    <td><span className={`pill ${item.risk}`}>{item.risk}</span></td>
                    <td style={{ color: "var(--muted2)" }}>{item.date}</td>
                    <td>
                      <span className={`pill ${st === "Approved" ? "success" : st === "Rejected" ? "danger" : "muted"}`}>{st}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        {st === "Pending" || st === "Review" ? (
                          <>
                            <button className="action-btn approve" onClick={() => approve(item.id)}><Check size={12} /> Approve</button>
                            <button className="action-btn reject"  onClick={() => reject(item.id)}><X size={12} /> Reject</button>
                          </>
                        ) : null}
                        <button className="action-btn view" onClick={() => navigate(`/app/loan-requests/${item.id}`)}><Eye size={12} /> View</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   LOAN DETAIL PAGE
───────────────────────────────────────── */
export function LoanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = applications.find((a) => a.id === id);
  const [status, setStatus] = useState(loan?.status ?? "Pending");
  const [tab, setTab] = useState("overview");

  if (!loan) return (
    <div className="empty-state">
      <div className="empty-icon"><FileText size={24} color="var(--muted2)" /></div>
      <div className="empty-title">Loan not found</div>
      <button className="btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={14} /> Go back</button>
    </div>
  );

  const repaymentHistory = [
    { id: "RCP-001", date: "5 May 2026",  amount: "KES 4,200", method: "M-Pesa", status: "success" },
    { id: "RCP-002", date: "5 Apr 2026",  amount: "KES 4,200", method: "M-Pesa", status: "success" },
    { id: "RCP-003", date: "5 Mar 2026",  amount: "KES 4,200", method: "Paybill", status: "success" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 8 }}>
            <ArrowLeft size={14} /> Back to Loan Requests
          </button>
          <h1>{loan.id}</h1>
          <p>{loan.product} · {loan.amount} · Applied {loan.date}</p>
        </div>
        <div className="page-header-actions">
          {(status === "Pending" || status === "Review") && (
            <>
              <button className="action-btn approve" style={{ padding: "10px 18px", fontSize: 13 }} onClick={() => setStatus("Approved")}>
                <Check size={14} /> Approve Loan
              </button>
              <button className="action-btn reject" style={{ padding: "10px 18px", fontSize: 13 }} onClick={() => setStatus("Rejected")}>
                <X size={14} /> Reject
              </button>
            </>
          )}
          {status === "Approved" && <span className="pill success" style={{ padding: "10px 18px", fontSize: 13 }}><CheckCircle size={14} /> Approved</span>}
          {status === "Rejected" && <span className="pill danger"  style={{ padding: "10px 18px", fontSize: 13 }}><X size={14} /> Rejected</span>}
        </div>
      </div>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-avatar-lg">{loan.user.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
        <div style={{ flex: 1 }}>
          <div className="detail-name">{loan.user}</div>
          <div className="detail-meta">{loan.phone} · {loan.product}</div>
          <div className="detail-badges">
            <span className={`pill ${loan.risk}`}>{loan.risk} risk</span>
            <span className={`pill ${status === "Approved" ? "success" : status === "Rejected" ? "danger" : "muted"}`}>{status}</span>
            <span className="pill blue">Score: {loan.score}</span>
          </div>
        </div>
        <ScoreRing score={loan.score} color={loan.score > 70 ? "#22c55e" : loan.score > 50 ? "#f59e0b" : "#ef4444"} size={90} />
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["overview", "repayments", "documents", "timeline"].map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Loan Details</div>
            {[
              { label: "Loan ID",       value: loan.id },
              { label: "Product",       value: loan.product },
              { label: "Amount",        value: loan.amount },
              { label: "Tenure",        value: loan.tenure },
              { label: "Purpose",       value: loan.purpose },
              { label: "Disbursement",  value: `M-Pesa → ${loan.mpesa}` },
              { label: "Applied",       value: loan.date },
              { label: "Processing Fee",value: "KES 750" },
            ].map((row) => (
              <div key={row.label} className="data-row">
                <span className="data-label">{row.label}</span>
                <span className="data-value">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="col-stack">
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 14 }}>Applicant Info</div>
              {[
                { label: "Full Name",   value: loan.user },
                { label: "Phone",       value: loan.phone },
                { label: "KYC Status",  value: "Verified" },
                { label: "User ID",     value: loan.userId },
              ].map((row) => (
                <div key={row.label} className="data-row">
                  <span className="data-label">{row.label}</span>
                  <span className="data-value">{row.value}</span>
                </div>
              ))}
              <button className="btn-secondary" style={{ marginTop: 12, width: "100%" }}
                onClick={() => navigate(`/app/users/${loan.userId}`)}>
                <Eye size={14} /> View Full Profile
              </button>
            </div>
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 12 }}>Risk Breakdown</div>
              {[
                { label: "Credit Score",    pct: loan.score, color: loan.score > 70 ? "#22c55e" : "#f59e0b" },
                { label: "Payment History", pct: 82, color: "#3b82f6" },
                { label: "ID Verification", pct: 100, color: "#22c55e" },
                { label: "Income Ratio",    pct: 65, color: "#facc15" },
              ].map((item) => (
                <div key={item.label} className="progress-wrap" style={{ marginBottom: 10 }}>
                  <div className="progress-label-row">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-value">{item.pct}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: item.pct + "%", background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "repayments" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Repayment History</div></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Receipt ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                {repaymentHistory.map((r) => (
                  <tr key={r.id}>
                    <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{r.id}</td>
                    <td>{r.date}</td>
                    <td style={{ fontWeight: 700 }}>{r.amount}</td>
                    <td>{r.method}</td>
                    <td><span className="pill success"><CheckCircle size={11} /> {r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "documents" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Submitted Documents</div></div>
          {[
            { label: "National ID (Front)", status: "verified", date: "10 May 2026" },
            { label: "National ID (Back)",  status: "verified", date: "10 May 2026" },
            { label: "Selfie / Liveness",   status: "verified", date: "10 May 2026" },
            { label: "M-Pesa Statement",    status: "pending",  date: "11 May 2026" },
          ].map((doc) => (
            <div key={doc.label} className="list-item">
              <div className="list-icon" style={{ background: doc.status === "verified" ? "var(--success-bg)" : "var(--warning-bg)" }}>
                <FileText size={16} color={doc.status === "verified" ? "var(--success)" : "var(--warning)"} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="list-item-title">{doc.label}</div>
                <div className="list-item-sub">Submitted {doc.date}</div>
              </div>
              <span className={`pill ${doc.status === "verified" ? "success" : "warning"}`}>{doc.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "timeline" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Application Timeline</div></div>
          <div className="timeline">
            {[
              { title: "Application submitted",    sub: "Borrower submitted via mobile app",  time: `${loan.date} 09:12`, color: "#3b82f6",  Icon: FileText    },
              { title: "KYC documents uploaded",   sub: "ID front/back + selfie submitted",   time: `${loan.date} 09:18`, color: "#22c55e",  Icon: ShieldCheck },
              { title: "KYC verified",             sub: "Identity confirmed by KYC Analyst",  time: `${loan.date} 10:02`, color: "#22c55e",  Icon: BadgeCheck  },
              { title: "Risk score calculated",    sub: `Score: ${loan.score} — ${loan.risk} risk`, time: `${loan.date} 10:03`, color: loan.score > 70 ? "#22c55e" : "#f59e0b", Icon: Activity },
              { title: "Pending officer review",   sub: "Awaiting loan officer decision",     time: `${loan.date} 10:04`, color: "#facc15",  Icon: Clock       },
            ].map(({ title, sub, time, color, Icon }) => (
              <div key={title} className="timeline-item">
                <div className="timeline-dot" style={{ background: color + "22", border: `2px solid ${color}` }}>
                  <Icon size={14} color={color} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">{title}</div>
                  <div className="timeline-sub">{sub}</div>
                  <div className="timeline-time">{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   USERS PAGE
───────────────────────────────────────── */
export function UsersPage() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const filtered = TEAM_MEMBERS.filter((m) => {
    const matchRole = roleFilter === "all" || m.role === roleFilter;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <>
      {showInvite && <InviteUserModal onClose={() => setShowInvite(false)} />}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}

      <div className="page-header">
        <div className="page-header-left">
          <h1>User Management</h1>
          <p>Manage admin team members, roles, and permissions across the platform.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary" onClick={() => setShowExport(true)}><Download size={14} /> Export</button>
          <button className="btn-primary" onClick={() => setShowInvite(true)}><Plus size={14} /> Invite User</button>
        </div>
      </div>

      {/* Role cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {ROLES.map(({ id, label, color, Icon }) => {
          const count = TEAM_MEMBERS.filter((m) => m.role === id).length;
          return (
            <button key={id} className="panel"
              style={{ textAlign: "left", cursor: "pointer", borderColor: roleFilter === id ? color + "66" : "var(--border)", background: roleFilter === id ? color + "11" : "var(--surface)" }}
              onClick={() => setRoleFilter(roleFilter === id ? "all" : id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={color} />
                </div>
                <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 12 }}>{label}</span>
              </div>
              <div style={{ color, fontSize: 22, fontWeight: 900 }}>{count}</div>
              <div style={{ color: "var(--muted2)", fontSize: 11 }}>member{count !== 1 ? "s" : ""}</div>
            </button>
          );
        })}
      </div>

      {/* Team table */}
      <div className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Team Members</div>
            <div className="panel-sub">{filtered.length} of {TEAM_MEMBERS.length} shown</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div className="input-wrap" style={{ width: 240 }}>
              <Search size={14} color="var(--muted)" />
              <input placeholder="Search name or email…" value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", padding: "8px 0", fontSize: 13, width: "100%" }} />
            </div>
            <button className="btn-secondary" onClick={() => setRoleFilter("all")} style={{ fontSize: 12, padding: "7px 12px" }}>
              <Filter size={12} /> Clear
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Location</th><th>Joined</th><th>Last Active</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((member) => {
                const role = ROLES.find((r) => r.id === member.role);
                return (
                  <tr key={member.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/app/users/${member.id}`)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--brand-glow)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "var(--brand-light)", flexShrink: 0 }}>
                          {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{member.name}</div>
                          <div style={{ color: "var(--muted2)", fontSize: 11 }}>{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {role && (
                        <span className="pill" style={{ background: role.color + "18", color: role.color, display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <role.Icon size={11} color={role.color} /> {role.label}
                        </span>
                      )}
                    </td>
                    <td><span className={`pill ${member.status === "active" ? "success" : "muted"}`}>{member.status === "active" ? <BadgeCheck size={11} /> : <AlertCircle size={11} />} {member.status}</span></td>
                    <td style={{ color: "var(--muted2)", fontSize: 12 }}>{member.location}</td>
                    <td style={{ color: "var(--muted2)", fontSize: 12 }}>{member.joined}</td>
                    <td style={{ color: "var(--muted2)", fontSize: 12 }}>{member.lastActive}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="action-btn view" onClick={() => navigate(`/app/users/${member.id}`)}><Eye size={12} /></button>
                        <button className="action-btn review"><UserCog size={12} /></button>
                        <button className="action-btn reject"><UserX size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Borrower segments */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Borrower Segments</div>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 12px" }}><ChevronRight size={12} /> View all borrowers</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { label: "New Users",         value: "1,248", Icon: Users,         color: "#3b82f6" },
            { label: "Active Borrowers",  value: "3,932", Icon: Briefcase,     color: "#22c55e" },
            { label: "Dormant (6m+)",     value: "2,001", Icon: Clock,         color: "#a78bfa" },
            { label: "High-Value Cohort", value: "486",   Icon: Star,          color: "#facc15" },
            { label: "Delinquent",        value: "102",   Icon: AlertTriangle, color: "#ef4444" },
            { label: "Blacklisted",       value: "23",    Icon: UserX,         color: "#64748b" },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "var(--text)", fontWeight: 700, fontSize: 14 }}>{value}</div>
                <div style={{ color: "var(--muted2)", fontSize: 12 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   USER DETAIL PAGE
───────────────────────────────────────── */
export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = TEAM_MEMBERS.find((m) => m.id === id);
  const [tab, setTab] = useState("overview");

  if (!member) return (
    <div className="empty-state">
      <div className="empty-icon"><Users size={24} color="var(--muted2)" /></div>
      <div className="empty-title">User not found</div>
      <button className="btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={14} /> Go back</button>
    </div>
  );

  const role = ROLES.find((r) => r.id === member.role);
  const userLoans = applications.filter((a) => a.userId === id);

  const activityData = [12, 18, 9, 22, 15, 28, 20, 31].map((v) => v * 100);

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 8 }}>
            <ArrowLeft size={14} /> Back to Users
          </button>
          <h1>{member.name}</h1>
          <p>{role?.label} · {member.email}</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Mail size={14} /> Send Email</button>
          <button className="action-btn reject" style={{ padding: "10px 16px", fontSize: 13 }}><UserX size={14} /> Suspend</button>
        </div>
      </div>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-avatar-lg">{member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
        <div style={{ flex: 1 }}>
          <div className="detail-name">{member.name}</div>
          <div className="detail-meta">{member.phone} · {member.location}</div>
          <div className="detail-badges">
            {role && (
              <span className="pill" style={{ background: role.color + "18", color: role.color, display: "inline-flex", alignItems: "center", gap: 5 }}>
                <role.Icon size={11} color={role.color} /> {role.label}
              </span>
            )}
            <span className={`pill ${member.status === "active" ? "success" : "muted"}`}>{member.status}</span>
            <span className="pill muted"><Building size={11} /> {member.location}</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="stat-row">
        <div className="stat-item"><div className="stat-item-value">{member.loans}</div><div className="stat-item-label">Loans Processed</div></div>
        <div className="stat-item"><div className="stat-item-value">{member.kyc}</div><div className="stat-item-label">KYC Reviews</div></div>
        <div className="stat-item"><div className="stat-item-value">{member.collections}</div><div className="stat-item-label">Collections Cases</div></div>
        <div className="stat-item"><div className="stat-item-value">{member.joined}</div><div className="stat-item-label">Joined</div></div>
        <div className="stat-item"><div className="stat-item-value">{member.lastActive}</div><div className="stat-item-label">Last Active</div></div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["overview", "activity", "loans", "permissions"].map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Profile Details</div>
            {[
              { label: "User ID",     value: member.id,     Icon: Hash     },
              { label: "Full Name",   value: member.name,   Icon: Users    },
              { label: "Email",       value: member.email,  Icon: Mail     },
              { label: "Phone",       value: member.phone,  Icon: Phone    },
              { label: "Location",    value: member.location, Icon: MapPin },
              { label: "Role",        value: role?.label ?? "", Icon: Briefcase },
              { label: "Joined",      value: member.joined, Icon: Calendar },
              { label: "Last Active", value: member.lastActive, Icon: Clock },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="data-row">
                <span className="data-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon size={13} color="var(--muted)" /> {label}
                </span>
                <span className="data-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="col-stack">
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 12 }}>Activity Trend (8 Weeks)</div>
              <LineChart
                datasets={[{ label: "Actions", color: role?.color ?? "#3b82f6", data: activityData }]}
                labels={["Wk1","Wk2","Wk3","Wk4","Wk5","Wk6","Wk7","Wk8"]}
                height={130}
              />
            </div>
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 12 }}>Quick Actions</div>
              <div className="col-stack">
                <button className="btn-secondary"><UserCog size={14} /> Edit Role</button>
                <button className="btn-secondary"><Lock size={14} /> Reset Password</button>
                <button className="btn-secondary"><Mail size={14} /> Send Message</button>
                <button className="btn-danger"><UserX size={14} /> Suspend Account</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "activity" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Recent Activity</div></div>
          <div className="timeline">
            {[
              { title: "Approved loan LN-1002",         sub: "KES 50,000 · Market Bond",    time: "Today 10:14",    color: "#22c55e", Icon: CheckCircle },
              { title: "Reviewed application LN-1009",  sub: "KES 80,000 · Group Loan",     time: "Today 09:41",    color: "#3b82f6", Icon: Eye         },
              { title: "Rejected loan LN-1005",         sub: "KES 120,000 · Logbook Loan",  time: "Today 09:22",    color: "#ef4444", Icon: X           },
              { title: "Logged in",                     sub: "Nairobi HQ · Chrome",         time: "Today 08:55",    color: "#64748b", Icon: Activity    },
              { title: "Approved loan LN-0998",         sub: "KES 35,000 · Salary Loan",    time: "Yesterday 16:30",color: "#22c55e", Icon: CheckCircle },
            ].map(({ title, sub, time, color, Icon }) => (
              <div key={title} className="timeline-item">
                <div className="timeline-dot" style={{ background: color + "22", border: `2px solid ${color}` }}>
                  <Icon size={14} color={color} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">{title}</div>
                  <div className="timeline-sub">{sub}</div>
                  <div className="timeline-time">{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "loans" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Loans Processed by {member.name}</div></div>
          {userLoans.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FileText size={22} color="var(--muted2)" /></div>
              <div className="empty-title">No loans found</div>
              <div className="empty-sub">This user hasn't processed any loans yet.</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Loan ID</th><th>Borrower</th><th>Amount</th><th>Product</th><th>Risk</th><th>Status</th></tr></thead>
                <tbody>
                  {userLoans.map((loan) => (
                    <tr key={loan.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/app/loan-requests/${loan.id}`)}>
                      <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{loan.id}</td>
                      <td>{loan.user}</td>
                      <td style={{ fontWeight: 700 }}>{loan.amount}</td>
                      <td>{loan.product}</td>
                      <td><span className={`pill ${loan.risk}`}>{loan.risk}</span></td>
                      <td><span className="pill muted">{loan.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "permissions" && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Module Access</div>
            {[
              { module: "Loan Requests",  access: member.role === "loan-officer" || member.role === "super-admin" },
              { module: "KYC Console",    access: member.role === "kyc-analyst"  || member.role === "super-admin" },
              { module: "Collections",    access: ["collections","debt-collector","super-admin"].includes(member.role) },
              { module: "Users",          access: member.role === "super-admin" },
              { module: "Reports",        access: ["risk-analyst","compliance","super-admin"].includes(member.role) },
              { module: "Audit Logs",     access: ["compliance","super-admin"].includes(member.role) },
              { module: "Settings",       access: member.role === "super-admin" },
              { module: "Campaigns",      access: ["super-admin","loan-officer"].includes(member.role) },
            ].map(({ module, access }) => (
              <div key={module} className="toggle-row">
                <div className="toggle-info-title">{module}</div>
                <span className={`pill ${access ? "success" : "muted"}`}>
                  {access ? <CheckCircle size={11} /> : <X size={11} />} {access ? "Allowed" : "Restricted"}
                </span>
              </div>
            ))}
          </div>
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Role Description</div>
            {role && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: role.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <role.Icon size={22} color={role.color} />
                </div>
                <div>
                  <div style={{ color: role.color, fontWeight: 800, fontSize: 16 }}>{role.label}</div>
                  <div style={{ color: "var(--muted2)", fontSize: 12 }}>Assigned role</div>
                </div>
              </div>
            )}
            <button className="btn-primary" style={{ width: "100%" }}><UserCog size={14} /> Change Role</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   KYC PAGE
───────────────────────────────────────── */
export function KycPage() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [showResubmit, setShowResubmit] = useState<string | null>(null);

  const getStatus = (id: string) => statuses[id] ?? "pending";
  const approve = (id: string) => setStatuses((p) => ({ ...p, [id]: "approved" }));
  const reject  = (id: string) => setStatuses((p) => ({ ...p, [id]: "rejected" }));

  const verificationTrend = [44, 51, 48, 62, 57, 71, 68, 79, 74, 89, 84, 91].map((v) => v * 100);
  const flaggedTrend      = [8,  6,  9,  5,  7,  4,  6,  3,  5,  4,  3,  4 ].map((v) => v * 100);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      {showResubmit && (
        <div className="modal-overlay" onClick={() => setShowResubmit(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Request Resubmission</span>
              <button className="modal-close" onClick={() => setShowResubmit(null)}><X size={14} /></button>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--muted2)", fontSize: 14 }}>Select the documents that need to be resubmitted for <strong style={{ color: "var(--text)" }}>{showResubmit}</strong>.</p>
              {["National ID (Front)", "National ID (Back)", "Selfie / Liveness", "Proof of Income"].map((doc) => (
                <label key={doc} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", color: "var(--text)", fontSize: 13, cursor: "pointer", borderBottom: "1px solid var(--border)" }}>
                  <input type="checkbox" style={{ accentColor: "var(--yellow)" }} /> {doc}
                </label>
              ))}
              <div className="form-field" style={{ marginTop: 8 }}>
                <label className="form-label">Reason / Note to Applicant</label>
                <textarea className="form-input" rows={3} placeholder="e.g. ID image is blurry, please reupload..." style={{ resize: "vertical" }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowResubmit(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowResubmit(null)}><RefreshCw size={14} /> Send Request</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="page-header-left">
          <h1>KYC Console</h1>
          <p>Review identity documents, flag mismatches, and manage the verification queue.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Download size={14} /> Bulk Export</button>
          <button className="btn-primary"><CheckCircle size={14} /> Bulk Approve Low Risk</button>
        </div>
      </div>

      <div className="stat-row">
        {[
          { label: "Pending Review",   value: "17"    },
          { label: "Flagged",          value: "4"     },
          { label: "Duplicates",       value: "2"     },
          { label: "Avg Process Time", value: "9 min" },
          { label: "Approved Today",   value: "34"    },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-item-value">{s.value}</div>
            <div className="stat-item-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">KYC Verification Trend (12 months)</div>
        </div>
        <LineChart
          datasets={[
            { label: "Verified",  color: "#22c55e", data: verificationTrend },
            { label: "Flagged",   color: "#ef4444", data: flaggedTrend      },
          ]}
          labels={months}
          height={160}
        />
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Verification Queue</div>
            <span className="chip warning"><AlertTriangle size={11} /> {kycQueue.length} pending</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>User ID</th><th>Name</th><th>Flag</th><th>Risk</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {kycQueue.map((item) => {
                  const st = getStatus(item.id);
                  return (
                    <tr key={item.id}>
                      <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{item.id}</td>
                      <td style={{ fontWeight: 700 }}>{item.name}</td>
                      <td><span className={`pill ${item.risk}`}>{item.flag}</span></td>
                      <td><span className={`pill ${item.risk}`}>{item.risk}</span></td>
                      <td style={{ color: "var(--muted2)", fontSize: 12 }}>{item.submitted}</td>
                      <td>
                        <span className={`pill ${st === "approved" ? "success" : st === "rejected" ? "danger" : "muted"}`}>
                          {st}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          {st === "pending" && (
                            <>
                              <button className="action-btn approve" onClick={() => approve(item.id)}><Check size={12} /></button>
                              <button className="action-btn reject"  onClick={() => reject(item.id)}><X size={12} /></button>
                            </>
                          )}
                          <button className="action-btn review" onClick={() => setShowResubmit(item.name)}>
                            <RefreshCw size={12} /> Resubmit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-stack">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Quick Actions</div>
            <div className="col-stack">
              <button className="btn-primary"><Search size={14} /> Open ID Review Console</button>
              <button className="btn-secondary"><CheckCircle size={14} /> Bulk approve low risk</button>
              <button className="btn-secondary"><RefreshCw size={14} /> Send resubmission request</button>
              <button className="btn-secondary"><Download size={14} /> Download flagged list</button>
            </div>
          </div>
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 12 }}>Step Completion Rates</div>
            {[
              { label: "ID Upload",      pct: 94, color: "#22c55e" },
              { label: "Selfie Match",   pct: 87, color: "#3b82f6" },
              { label: "Liveness Check", pct: 82, color: "#facc15" },
              { label: "Data Confirm",   pct: 91, color: "#a78bfa" },
            ].map((item) => (
              <div key={item.label} className="progress-wrap" style={{ marginBottom: 12 }}>
                <div className="progress-label-row">
                  <span className="progress-label">{item.label}</span>
                  <span className="progress-value">{item.pct}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   COLLECTIONS PAGE
───────────────────────────────────────── */
export function CollectionsPage() {
  const [showPromise, setShowPromise] = useState(false);

  const parTrend    = [8.1, 7.4, 8.8, 7.2, 6.9, 7.5, 6.3, 6.8, 6.1, 5.9, 6.3, 6.3].map((v) => v * 10000);
  const recoveryTrend = [68, 71, 66, 73, 75, 72, 74, 76, 73, 77, 74, 74].map((v) => v * 1000);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const delinquentAccounts = [
    { id: "USR-1037", name: "John Kamau",    amount: "KES 12,400", days: 34, bucket: "30+", phone: "+254711000001" },
    { id: "USR-1042", name: "Rose Akinyi",   amount: "KES 8,200",  days: 22, bucket: "8-30", phone: "+254722000002" },
    { id: "USR-1055", name: "Moses Kiprop",  amount: "KES 31,000", days: 41, bucket: "30+", phone: "+254733000003" },
    { id: "USR-1061", name: "Lydia Waweru",  amount: "KES 5,600",  days: 9,  bucket: "8-30", phone: "+254744000004" },
    { id: "USR-1078", name: "Felix Ochieng", amount: "KES 18,900", days: 3,  bucket: "1-7",  phone: "+254755000005" },
  ];

  return (
    <>
      {showPromise && (
        <div className="modal-overlay" onClick={() => setShowPromise(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Record Promise to Pay</span>
              <button className="modal-close" onClick={() => setShowPromise(false)}><X size={14} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Borrower ID</label>
                  <input className="form-input" placeholder="USR-XXXX" />
                </div>
                <div className="form-field">
                  <label className="form-label">Promise Date</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-field">
                  <label className="form-label">Amount Promised (KES)</label>
                  <input className="form-input" type="number" placeholder="e.g. 5000" />
                </div>
                <div className="form-field">
                  <label className="form-label">Payment Method</label>
                  <select className="form-input">
                    <option>M-Pesa</option><option>Paybill</option><option>Bank Transfer</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Agent Notes</label>
                <textarea className="form-input" rows={3} placeholder="Call outcome, borrower response..." style={{ resize: "vertical" }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowPromise(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowPromise(false)}><UserCheck size={14} /> Save Promise</button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Collections Workbench</h1>
          <p>Track delinquency buckets, promises to pay, and recovery performance.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Phone size={14} /> Bulk Call List</button>
          <button className="btn-secondary" onClick={() => setShowPromise(true)}><UserCheck size={14} /> Record Promise</button>
          <button className="btn-primary"><MessageSquare size={14} /> Send Reminders</button>
        </div>
      </div>

      {/* PAR buckets */}
      <div className="three-col">
        {[
          { label: "1–7 Days",  count: 61, color: "#facc15", bg: "var(--yellow-glow)",   border: "rgba(202,138,4,0.3)"  },
          { label: "8–30 Days", count: 29, color: "#f97316", bg: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.3)" },
          { label: "30+ Days",  count: 12, color: "#ef4444", bg: "var(--danger-bg)",     border: "rgba(239,68,68,0.3)"  },
        ].map((b) => (
          <div key={b.label} className="panel" style={{ borderColor: b.border, background: b.bg, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: b.color }}>{b.count}</div>
            <div style={{ color: b.color, fontWeight: 700, fontSize: 14 }}>{b.label} Overdue</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="two-col">
        <div className="panel">
          <div className="panel-header"><div className="panel-title">PAR30 Trend (12 months)</div></div>
          <LineChart
            datasets={[{ label: "PAR30 %", color: "#ef4444", data: parTrend }]}
            labels={months} height={150}
          />
        </div>
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Recovery Rate Trend</div></div>
          <LineChart
            datasets={[{ label: "Recovery %", color: "#22c55e", data: recoveryTrend }]}
            labels={months} height={150}
          />
        </div>
      </div>

      {/* Delinquent accounts table */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Delinquent Accounts</div>
          <button className="btn-secondary" style={{ fontSize: 12, padding: "6px 12px" }}><Download size={12} /> Export</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User ID</th><th>Name</th><th>Outstanding</th><th>Days Overdue</th><th>Bucket</th><th>Phone</th><th>Actions</th></tr></thead>
            <tbody>
              {delinquentAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{acc.id}</td>
                  <td style={{ fontWeight: 700 }}>{acc.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--danger)" }}>{acc.amount}</td>
                  <td><span className={`pill ${acc.days > 30 ? "danger" : acc.days > 7 ? "warning" : "yellow"}`}>{acc.days}d</span></td>
                  <td><span className={`pill ${acc.bucket === "30+" ? "danger" : acc.bucket === "8-30" ? "warning" : "yellow"}`}>{acc.bucket}</span></td>
                  <td style={{ color: "var(--muted2)", fontSize: 12 }}>{acc.phone}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="action-btn view" onClick={() => setShowPromise(true)}><UserCheck size={12} /> Promise</button>
                      <button className="action-btn review"><Phone size={12} /> Call</button>
                      <button className="action-btn reject"><AlertCircle size={12} /> Escalate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 14 }}>Today's Workload</div>
          {[
            { Icon: UserCheck,     label: "Promises to pay due today",   value: "22", color: "#22c55e" },
            { Icon: RefreshCw,     label: "Restructure requests pending", value: "6",  color: "#f97316" },
            { Icon: Phone,         label: "Calls scheduled",              value: "38", color: "#3b82f6" },
            { Icon: MessageSquare, label: "SMS reminders sent",           value: "124",color: "#a78bfa" },
          ].map(({ Icon, label, value, color }) => (
            <div key={label} className="list-item">
              <div className="list-icon" style={{ background: color + "22" }}><Icon size={16} color={color} /></div>
              <div style={{ flex: 1 }}><div className="list-item-title">{label}</div></div>
              <div style={{ color, fontWeight: 900, fontSize: 20 }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 14 }}>Recovery Performance</div>
          {[
            { label: "Recovery Rate MTD",   value: "74.2%", pct: 74, color: "#22c55e" },
            { label: "Promise Kept Rate",   value: "61.8%", pct: 62, color: "#3b82f6" },
            { label: "Restructure Success", value: "83.3%", pct: 83, color: "#facc15" },
          ].map((item) => (
            <div key={item.label} className="progress-wrap" style={{ marginBottom: 16 }}>
              <div className="progress-label-row">
                <span className="progress-label">{item.label}</span>
                <span className="progress-value">{item.value}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: item.pct + "%", background: item.color }} />
              </div>
            </div>
          ))}
          <div className="info-box yellow">
            <Zap size={14} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>12 accounts are 30+ days overdue and require escalation to legal.</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   BORROWERS DATA
───────────────────────────────────────── */
const BORROWERS = [
  { id: "BRW-001", name: "Mary Wanjiku",    phone: "+254712000111", email: "mary.w@gmail.com",    kyc: "verified",  activeLoan: "LN-1001", loanAmount: "KES 80,000",  outstanding: "KES 62,400", score: 742, status: "active",     joined: "Jan 2025", location: "Nairobi",  repayRate: 92 },
  { id: "BRW-002", name: "James Otieno",    phone: "+254723000222", email: "j.otieno@gmail.com",  kyc: "verified",  activeLoan: "LN-1002", loanAmount: "KES 50,000",  outstanding: "KES 50,000", score: 68,  status: "pending",    joined: "Mar 2025", location: "Kisumu",   repayRate: 0  },
  { id: "BRW-003", name: "Grace Wambui",    phone: "+254734000333", email: "grace.w@gmail.com",   kyc: "flagged",   activeLoan: "LN-1005", loanAmount: "KES 120,000", outstanding: "KES 120,000",score: 42,  status: "review",     joined: "Apr 2025", location: "Mombasa",  repayRate: 0  },
  { id: "BRW-004", name: "David Kiptoo",    phone: "+254745000444", email: "d.kiptoo@gmail.com",  kyc: "verified",  activeLoan: "LN-1007", loanAmount: "KES 35,000",  outstanding: "KES 35,000", score: 88,  status: "pending",    joined: "May 2025", location: "Eldoret",  repayRate: 0  },
  { id: "BRW-005", name: "Aisha Mwangi",    phone: "+254756000555", email: "aisha.m@gmail.com",   kyc: "verified",  activeLoan: "LN-1009", loanAmount: "KES 80,000",  outstanding: "KES 80,000", score: 79,  status: "pending",    joined: "May 2025", location: "Nairobi",  repayRate: 0  },
  { id: "BRW-006", name: "Peter Njoroge",   phone: "+254767000666", email: "p.njoroge@gmail.com", kyc: "pending",   activeLoan: "LN-1011", loanAmount: "KES 200,000", outstanding: "KES 200,000",score: 38,  status: "review",     joined: "May 2025", location: "Nakuru",   repayRate: 0  },
  { id: "BRW-007", name: "Rose Akinyi",     phone: "+254778000777", email: "rose.a@gmail.com",    kyc: "verified",  activeLoan: "LN-0998", loanAmount: "KES 45,000",  outstanding: "KES 8,200",  score: 81,  status: "delinquent", joined: "Nov 2024", location: "Kisumu",   repayRate: 78 },
  { id: "BRW-008", name: "Moses Kiprop",    phone: "+254789000888", email: "m.kiprop@gmail.com",  kyc: "verified",  activeLoan: "LN-0991", loanAmount: "KES 60,000",  outstanding: "KES 31,000", score: 55,  status: "delinquent", joined: "Oct 2024", location: "Eldoret",  repayRate: 48 },
];

/* ─────────────────────────────────────────
   BORROWERS PAGE
───────────────────────────────────────── */
export function BorrowersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [kycFilter, setKycFilter] = useState("all");
  const [showExport, setShowExport] = useState(false);

  const filtered = BORROWERS.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchKyc    = kycFilter === "all"    || b.kyc === kycFilter;
    return matchSearch && matchStatus && matchKyc;
  });

  const totalOutstanding = BORROWERS.reduce((sum, b) => {
    const n = parseInt(b.outstanding.replace(/\D/g, ""));
    return sum + n;
  }, 0);

  return (
    <>
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}

      <div className="page-header">
        <div className="page-header-left">
          <h1>Borrowers</h1>
          <p>All customers with active or pending loans — click any row for full details.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary" onClick={() => setShowExport(true)}><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid">
        {[
          { label: "Total Borrowers",    value: BORROWERS.length.toString(),                                    Icon: Users,         color: "blue"   },
          { label: "Active Loans",       value: BORROWERS.filter((b) => b.status === "active").length.toString(), Icon: CheckCircle,   color: "green"  },
          { label: "Pending Approval",   value: BORROWERS.filter((b) => b.status === "pending" || b.status === "review").length.toString(), Icon: Clock, color: "yellow" },
          { label: "Total Outstanding",  value: `KES ${(totalOutstanding / 1000000).toFixed(1)}M`,              Icon: TrendingUp,    color: "purple" },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className={`kpi-card ${color}`}>
            <div className="kpi-icon" style={{ background: color === "yellow" ? "var(--yellow-glow)" : color === "green" ? "var(--success-bg)" : color === "purple" ? "rgba(167,139,250,0.12)" : "var(--brand-glow)" }}>
              <Icon size={18} color={color === "yellow" ? "var(--yellow)" : color === "green" ? "var(--success)" : color === "purple" ? "var(--purple)" : "var(--brand-light)"} />
            </div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div className="input-wrap" style={{ width: 260 }}>
          <Search size={14} color="var(--muted)" />
          <input placeholder="Search name, phone, ID…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", padding: "8px 0", fontSize: 13, width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all","active","pending","review","delinquent"].map((f) => (
            <button key={f} className="chip" onClick={() => setStatusFilter(f)}
              style={statusFilter === f ? { background: "var(--yellow-glow)", borderColor: "rgba(202,138,4,0.3)", color: "var(--yellow)" } : {}}>
              {f === "all" ? "All Status" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all","verified","pending","flagged"].map((f) => (
            <button key={f} className="chip" onClick={() => setKycFilter(f)}
              style={kycFilter === f ? { background: "var(--brand-glow)", borderColor: "rgba(59,130,246,0.3)", color: "var(--brand-light)" } : {}}>
              KYC: {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Borrower List</div>
          <div className="panel-sub">{filtered.length} of {BORROWERS.length} borrowers</div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Borrower</th><th>Loan ID</th><th>Amount</th><th>Outstanding</th><th>Score</th><th>KYC</th><th>Status</th><th>Repay Rate</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/app/borrowers/${b.id}`)}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--brand-glow)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "var(--brand-light)", flexShrink: 0 }}>
                        {b.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{b.name}</div>
                        <div style={{ color: "var(--muted2)", fontSize: 11 }}>{b.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{b.activeLoan}</td>
                  <td style={{ fontWeight: 700 }}>{b.loanAmount}</td>
                  <td style={{ fontWeight: 700, color: b.status === "delinquent" ? "var(--danger)" : "var(--text)" }}>{b.outstanding}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 40, height: 4, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${b.score}%`, height: "100%", background: b.score > 70 ? "var(--success)" : b.score > 50 ? "var(--warning)" : "var(--danger)", borderRadius: 999 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted2)" }}>{b.score}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`pill ${b.kyc === "verified" ? "success" : b.kyc === "flagged" ? "danger" : "warning"}`}>
                      {b.kyc === "verified" ? <BadgeCheck size={11} /> : b.kyc === "flagged" ? <AlertCircle size={11} /> : <Clock size={11} />}
                      {b.kyc}
                    </span>
                  </td>
                  <td>
                    <span className={`pill ${b.status === "active" ? "success" : b.status === "delinquent" ? "danger" : b.status === "review" ? "warning" : "muted"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 50, height: 4, background: "var(--border)", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${b.repayRate}%`, height: "100%", background: b.repayRate > 80 ? "var(--success)" : b.repayRate > 50 ? "var(--warning)" : "var(--danger)", borderRadius: 999 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted2)" }}>{b.repayRate}%</span>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="action-btn view" onClick={() => navigate(`/app/borrowers/${b.id}`)}><Eye size={12} /></button>
                      <button className="action-btn review"><UserCog size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   BORROWER DETAIL PAGE
───────────────────────────────────────── */
export function BorrowerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const borrower = BORROWERS.find((b) => b.id === id);
  const [tab, setTab] = useState("overview");
  const [loanStatus, setLoanStatus] = useState<Record<string, string>>({});

  if (!borrower) return (
    <div className="empty-state">
      <div className="empty-icon"><Users size={24} color="var(--muted2)" /></div>
      <div className="empty-title">Borrower not found</div>
      <button className="btn-secondary" onClick={() => navigate(-1)}><ArrowLeft size={14} /> Go back</button>
    </div>
  );

  const loan = applications.find((a) => a.id === borrower.activeLoan);
  const getLoanStatus = (lid: string) => loanStatus[lid] ?? loan?.status ?? "Pending";

  const repayHistory = [
    { id: "RCP-001", date: "5 May 2026",  amount: "KES 5,200", method: "M-Pesa",  status: "success" },
    { id: "RCP-002", date: "5 Apr 2026",  amount: "KES 5,200", method: "M-Pesa",  status: "success" },
    { id: "RCP-003", date: "5 Mar 2026",  amount: "KES 5,200", method: "Paybill", status: "success" },
    { id: "RCP-004", date: "5 Feb 2026",  amount: "KES 5,200", method: "M-Pesa",  status: "success" },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 8 }}>
            <ArrowLeft size={14} /> Back to Borrowers
          </button>
          <h1>{borrower.name}</h1>
          <p>{borrower.id} · {borrower.phone} · {borrower.location}</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Phone size={14} /> Call</button>
          <button className="btn-secondary"><Mail size={14} /> Email</button>
          {(getLoanStatus(borrower.activeLoan) === "Pending" || getLoanStatus(borrower.activeLoan) === "Review") && (
            <>
              <button className="action-btn approve" style={{ padding: "10px 16px", fontSize: 13 }}
                onClick={() => setLoanStatus((p) => ({ ...p, [borrower.activeLoan]: "Approved" }))}>
                <Check size={14} /> Approve Loan
              </button>
              <button className="action-btn reject" style={{ padding: "10px 16px", fontSize: 13 }}
                onClick={() => setLoanStatus((p) => ({ ...p, [borrower.activeLoan]: "Rejected" }))}>
                <X size={14} /> Reject
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-avatar-lg">{borrower.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
        <div style={{ flex: 1 }}>
          <div className="detail-name">{borrower.name}</div>
          <div className="detail-meta">{borrower.email} · {borrower.location}</div>
          <div className="detail-badges">
            <span className={`pill ${borrower.status === "active" ? "success" : borrower.status === "delinquent" ? "danger" : borrower.status === "review" ? "warning" : "muted"}`}>
              {borrower.status}
            </span>
            <span className={`pill ${borrower.kyc === "verified" ? "success" : borrower.kyc === "flagged" ? "danger" : "warning"}`}>
              KYC: {borrower.kyc}
            </span>
            <span className="pill blue">Score: {borrower.score}</span>
          </div>
        </div>
        <ScoreRing score={borrower.score} color={borrower.score > 70 ? "#22c55e" : borrower.score > 50 ? "#f59e0b" : "#ef4444"} size={90} />
      </div>

      {/* Stats */}
      <div className="stat-row">
        <div className="stat-item"><div className="stat-item-value">{borrower.loanAmount}</div><div className="stat-item-label">Loan Amount</div></div>
        <div className="stat-item"><div className="stat-item-value" style={{ color: "var(--warning)" }}>{borrower.outstanding}</div><div className="stat-item-label">Outstanding</div></div>
        <div className="stat-item"><div className="stat-item-value">{borrower.repayRate}%</div><div className="stat-item-label">Repay Rate</div></div>
        <div className="stat-item"><div className="stat-item-value">{borrower.score}</div><div className="stat-item-label">Credit Score</div></div>
        <div className="stat-item"><div className="stat-item-value">{borrower.joined}</div><div className="stat-item-label">Member Since</div></div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["overview","loan","kyc","repayments","timeline"].map((t) => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Personal Details</div>
            {[
              { label: "Borrower ID", value: borrower.id,       Icon: Hash     },
              { label: "Full Name",   value: borrower.name,     Icon: Users    },
              { label: "Email",       value: borrower.email,    Icon: Mail     },
              { label: "Phone",       value: borrower.phone,    Icon: Phone    },
              { label: "Location",    value: borrower.location, Icon: MapPin   },
              { label: "Member Since",value: borrower.joined,   Icon: Calendar },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="data-row">
                <span className="data-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon size={13} color="var(--muted)" /> {label}
                </span>
                <span className="data-value">{value}</span>
              </div>
            ))}
          </div>
          <div className="col-stack">
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 12 }}>Risk Breakdown</div>
              {[
                { label: "Credit Score",    pct: borrower.score, color: borrower.score > 70 ? "#22c55e" : "#f59e0b" },
                { label: "Repayment Rate",  pct: borrower.repayRate, color: "#3b82f6" },
                { label: "KYC Completion",  pct: borrower.kyc === "verified" ? 100 : 50, color: "#22c55e" },
                { label: "Income Verified", pct: 75, color: "#facc15" },
              ].map((item) => (
                <div key={item.label} className="progress-wrap" style={{ marginBottom: 10 }}>
                  <div className="progress-label-row">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-value">{item.pct}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: item.pct + "%", background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="panel">
              <div className="panel-title" style={{ marginBottom: 12 }}>Quick Actions</div>
              <div className="col-stack">
                <button className="btn-secondary"><CreditCard size={14} /> View Loan</button>
                <button className="btn-secondary"><MessageSquare size={14} /> Send Reminder</button>
                <button className="btn-secondary"><RefreshCw size={14} /> Restructure Loan</button>
                <button className="btn-danger"><AlertCircle size={14} /> Flag Account</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "loan" && loan && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">Active Loan — {loan.id}</div>
              <span className={`pill ${getLoanStatus(loan.id) === "Approved" ? "success" : getLoanStatus(loan.id) === "Rejected" ? "danger" : "muted"}`}>
                {getLoanStatus(loan.id)}
              </span>
            </div>
            {[
              { label: "Loan ID",      value: loan.id },
              { label: "Product",      value: loan.product },
              { label: "Amount",       value: loan.amount },
              { label: "Tenure",       value: loan.tenure },
              { label: "Purpose",      value: loan.purpose },
              { label: "Applied",      value: loan.date },
              { label: "Risk Score",   value: loan.score.toString() },
              { label: "Risk Level",   value: loan.risk },
            ].map((row) => (
              <div key={row.label} className="data-row">
                <span className="data-label">{row.label}</span>
                <span className="data-value">{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {(getLoanStatus(loan.id) === "Pending" || getLoanStatus(loan.id) === "Review") && (
                <>
                  <button className="action-btn approve" style={{ flex: 1, padding: "10px" }}
                    onClick={() => setLoanStatus((p) => ({ ...p, [loan.id]: "Approved" }))}>
                    <Check size={13} /> Approve
                  </button>
                  <button className="action-btn reject" style={{ flex: 1, padding: "10px" }}
                    onClick={() => setLoanStatus((p) => ({ ...p, [loan.id]: "Rejected" }))}>
                    <X size={13} /> Reject
                  </button>
                </>
              )}
              <button className="action-btn view" style={{ flex: 1, padding: "10px" }}
                onClick={() => navigate(`/app/loan-requests/${loan.id}`)}>
                <Eye size={13} /> Full Details
              </button>
            </div>
          </div>
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 12 }}>Risk Assessment</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <ScoreRing score={loan.score} color={loan.score > 70 ? "#22c55e" : loan.score > 50 ? "#f59e0b" : "#ef4444"} size={100} />
            </div>
            {[
              { label: "Credit Score",    pct: loan.score, color: loan.score > 70 ? "#22c55e" : "#f59e0b" },
              { label: "Payment History", pct: 82, color: "#3b82f6" },
              { label: "ID Verification", pct: borrower.kyc === "verified" ? 100 : 50, color: "#22c55e" },
              { label: "Income Ratio",    pct: 65, color: "#facc15" },
            ].map((item) => (
              <div key={item.label} className="progress-wrap" style={{ marginBottom: 10 }}>
                <div className="progress-label-row">
                  <span className="progress-label">{item.label}</span>
                  <span className="progress-value">{item.pct}</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: item.pct + "%", background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "kyc" && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">KYC Documents</div>
              <span className={`pill ${borrower.kyc === "verified" ? "success" : borrower.kyc === "flagged" ? "danger" : "warning"}`}>
                {borrower.kyc}
              </span>
            </div>
            {[
              { label: "National ID (Front)", status: borrower.kyc === "verified" ? "verified" : "pending",  date: "10 May 2026" },
              { label: "National ID (Back)",  status: borrower.kyc === "verified" ? "verified" : "pending",  date: "10 May 2026" },
              { label: "Selfie / Liveness",   status: borrower.kyc === "flagged"  ? "flagged"  : "verified", date: "10 May 2026" },
              { label: "M-Pesa Statement",    status: "verified",                                             date: "11 May 2026" },
              { label: "Bank Statement",      status: "pending",                                              date: "—"           },
            ].map((doc) => (
              <div key={doc.label} className="list-item">
                <div className="list-icon" style={{ background: doc.status === "verified" ? "var(--success-bg)" : doc.status === "flagged" ? "var(--danger-bg)" : "var(--warning-bg)" }}>
                  <FileText size={16} color={doc.status === "verified" ? "var(--success)" : doc.status === "flagged" ? "var(--danger)" : "var(--warning)"} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="list-item-title">{doc.label}</div>
                  <div className="list-item-sub">Submitted {doc.date}</div>
                </div>
                <span className={`pill ${doc.status === "verified" ? "success" : doc.status === "flagged" ? "danger" : "warning"}`}>{doc.status}</span>
              </div>
            ))}
          </div>
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>KYC Actions</div>
            <div className="col-stack">
              <button className="btn-primary"><CheckCircle size={14} /> Approve KYC</button>
              <button className="btn-secondary"><RefreshCw size={14} /> Request Resubmission</button>
              <button className="btn-secondary"><Eye size={14} /> View ID Documents</button>
              <button className="btn-danger"><AlertCircle size={14} /> Flag as Suspicious</button>
            </div>
            {borrower.kyc === "flagged" && (
              <div className="info-box danger" style={{ marginTop: 14 }}>
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                <span>Selfie does not match ID photo. Manual review required before approval.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "repayments" && (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Repayment History</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="chip success"><TrendingUp size={11} /> {borrower.repayRate}% on-time</span>
            </div>
          </div>
          <div className="progress-wrap" style={{ marginBottom: 16 }}>
            <div className="progress-label-row">
              <span className="progress-label">Repayment Progress</span>
              <span className="progress-value">{borrower.repayRate}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: borrower.repayRate + "%", background: borrower.repayRate > 80 ? "var(--success)" : "var(--warning)" }} />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Receipt ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                {repayHistory.map((r) => (
                  <tr key={r.id}>
                    <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{r.id}</td>
                    <td>{r.date}</td>
                    <td style={{ fontWeight: 700 }}>{r.amount}</td>
                    <td>{r.method}</td>
                    <td><span className="pill success"><CheckCircle size={11} /> {r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "timeline" && (
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Account Timeline</div></div>
          <div className="timeline">
            {[
              { title: "Account created",          sub: "Registered via mobile app",              time: `${borrower.joined} 09:00`, color: "#3b82f6",  Icon: Users       },
              { title: "KYC documents submitted",  sub: "ID + selfie uploaded",                   time: `${borrower.joined} 09:18`, color: "#22c55e",  Icon: ShieldCheck },
              { title: `KYC ${borrower.kyc}`,      sub: borrower.kyc === "verified" ? "Identity confirmed" : "Flagged for review", time: `${borrower.joined} 10:02`, color: borrower.kyc === "verified" ? "#22c55e" : "#ef4444", Icon: BadgeCheck },
              { title: "Loan application submitted",sub: `${borrower.activeLoan} · ${borrower.loanAmount}`, time: borrower.joined + " 10:30", color: "#facc15", Icon: FileText },
              { title: "Under officer review",     sub: "Awaiting loan officer decision",         time: borrower.joined + " 10:31", color: "#64748b",  Icon: Clock       },
            ].map(({ title, sub, time, color, Icon }) => (
              <div key={title} className="timeline-item">
                <div className="timeline-dot" style={{ background: color + "22", border: `2px solid ${color}` }}>
                  <Icon size={14} color={color} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">{title}</div>
                  <div className="timeline-sub">{sub}</div>
                  <div className="timeline-time">{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   CAMPAIGNS PAGE
───────────────────────────────────────── */
export function CampaignsPage() {
  const convTrend = [320, 410, 380, 520, 490, 610, 580, 720, 690, 810, 780, 920].map((v) => v * 100);
  const sentTrend = [2100, 2800, 2500, 3200, 3000, 3800, 3500, 4200, 4000, 4800, 4500, 5200].map((v) => v * 10);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Campaign Center</h1>
          <p>Run repayment reminders, top-up offers, and referral campaigns.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><BarChart2 size={14} /> Analytics</button>
          <button className="btn-primary"><Plus size={14} /> Create Campaign</button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><div className="panel-title">Campaign Performance (12 months)</div></div>
        <LineChart
          datasets={[
            { label: "Messages Sent", color: "#3b82f6", data: sentTrend },
            { label: "Conversions",   color: "#22c55e", data: convTrend },
          ]}
          labels={months} height={170}
        />
      </div>

      <div className="three-col">
        {[
          { name: "Repayment Reminder", status: "Active", sent: "12,400", ctr: "24%", conv: "18%", color: "#22c55e" },
          { name: "Top-up Promotion",   status: "Active", sent: "4,200",  ctr: "11%", conv: "8%",  color: "#3b82f6" },
          { name: "Referral Campaign",  status: "Active", sent: "8,100",  ctr: "19%", conv: "5%",  color: "#a78bfa" },
        ].map((c) => (
          <div key={c.name} className="panel" style={{ borderColor: c.color + "44" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontWeight: 800, color: "var(--text)", fontSize: 15 }}>{c.name}</div>
              <span className="pill success">{c.status}</span>
            </div>
            {[{ label: "Sent", value: c.sent }, { label: "CTR", value: c.ctr }, { label: "Conversion", value: c.conv }].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--muted2)", fontSize: 13 }}>{row.label}</span>
                <span style={{ color: c.color, fontWeight: 800, fontSize: 14 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn-secondary" style={{ flex: 1, fontSize: 12, padding: "8px" }}>Edit</button>
              <button className="btn-secondary" style={{ flex: 1, fontSize: 12, padding: "8px" }}>Pause</button>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header"><div className="panel-title">Campaign Performance Summary</div></div>
        <div className="stat-row">
          {[{ label: "Total Sent", value: "24,700" }, { label: "Total Opens", value: "9,880" }, { label: "Conversions", value: "1,240" }, { label: "Revenue Attributed", value: "KES 4.2M" }, { label: "Referrals", value: "406" }].map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-item-value">{s.value}</div>
              <div className="stat-item-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   REPORTS PAGE
───────────────────────────────────────── */
export function ReportsPage() {
  const disbursement = [6.2, 7.8, 7.1, 9.4, 8.6, 11.2, 10.4, 12.8].map((v) => v * 1000000);
  const par30        = [7.1, 6.8, 7.4, 6.2, 6.9, 6.5, 6.1, 6.3].map((v) => v * 10000);
  const weeks = ["Wk1","Wk2","Wk3","Wk4","Wk5","Wk6","Wk7","Wk8"];

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Portfolio Reports</h1>
          <p>Disbursement, repayment, and risk analytics for the current period.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Calendar size={14} /> Schedule Weekly Email</button>
          <button className="btn-secondary"><Download size={14} /> PDF</button>
          <button className="btn-primary"><Download size={14} /> CSV</button>
        </div>
      </div>

      <div className="kpi-grid">
        {[
          { label: "Disbursement MTD",    value: "KES 12.8M", Icon: TrendingUp,    color: "blue"   },
          { label: "PAR30",               value: "6.3%",      Icon: AlertTriangle, color: "yellow" },
          { label: "Net Interest Margin", value: "18.6%",     Icon: BarChart2,     color: "green"  },
          { label: "Write-offs MTD",      value: "KES 340K",  Icon: TrendingDown,  color: "purple" },
        ].map(({ label, value, Icon, color }) => (
          <div key={label} className={`kpi-card ${color}`}>
            <div className="kpi-icon" style={{ background: color === "yellow" ? "var(--yellow-glow)" : color === "green" ? "var(--success-bg)" : color === "purple" ? "rgba(167,139,250,0.12)" : "var(--brand-glow)" }}>
              <Icon size={18} color={color === "yellow" ? "var(--yellow)" : color === "green" ? "var(--success)" : color === "purple" ? "var(--purple)" : "var(--brand-light)"} />
            </div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-header"><div className="panel-title">Disbursement Trend (8 Weeks)</div></div>
          <LineChart datasets={[{ label: "Disbursement (KES)", color: "#3b82f6", data: disbursement }]} labels={weeks} height={150} />
        </div>
        <div className="panel">
          <div className="panel-header"><div className="panel-title">PAR30 Trend (8 Weeks)</div></div>
          <LineChart datasets={[{ label: "PAR30 %", color: "#ef4444", data: par30 }]} labels={weeks} height={150} />
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 14 }}>Disbursement by Product</div>
          {[{ label: "Salary Loan", value: "KES 6.4M", pct: 50, color: "#3b82f6" }, { label: "Market Bond", value: "KES 2.8M", pct: 22, color: "#22c55e" }, { label: "Boda Financing", value: "KES 2.1M", pct: 16, color: "#f97316" }, { label: "Group Loan", value: "KES 1.5M", pct: 12, color: "#a78bfa" }].map((item) => (
            <div key={item.label} className="progress-wrap" style={{ marginBottom: 14 }}>
              <div className="progress-label-row"><span className="progress-label">{item.label}</span><span className="progress-value">{item.value}</span></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: item.pct + "%", background: item.color }} /></div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 14 }}>Key Metrics</div>
          {[{ label: "Total Active Loans", value: "3,932" }, { label: "Average Loan Size", value: "KES 48,200" }, { label: "Average Tenure", value: "8.4 months" }, { label: "On-time Repayment Rate", value: "89.4%" }, { label: "Early Repayment Rate", value: "22.1%" }, { label: "Default Rate", value: "3.8%" }].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted2)", fontSize: 13 }}>{row.label}</span>
              <span style={{ color: "var(--text)", fontWeight: 700, fontSize: 13 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   AUDIT LOGS PAGE
───────────────────────────────────────── */
export function AuditLogsPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Audit Logs</h1>
          <p>Immutable record of every operator action across the platform.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary"><Filter size={14} /> Filter by actor</button>
          <button className="btn-primary"><Download size={14} /> Export Logs</button>
        </div>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Time</th><th>Actor</th><th>Role</th><th>Action</th><th>Resource</th><th>Type</th></tr></thead>
            <tbody>
              {auditLogs.map((log, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--muted2)", fontFamily: "monospace", fontSize: 12 }}>{log.time}</td>
                  <td style={{ fontWeight: 700 }}>{log.actor}</td>
                  <td><span className="pill muted">{log.role}</span></td>
                  <td>{log.action}</td>
                  <td style={{ color: "var(--brand-light)", fontWeight: 700 }}>{log.resource}</td>
                  <td><span className={`pill ${log.type}`}>{log.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="info-box blue">
        <Lock size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>Audit logs are immutable and tamper-proof. All entries are cryptographically signed and stored off-platform.</span>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   SETTINGS PAGE
───────────────────────────────────────── */
export function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    biometric: true, twofa: false, autoApprove: false, webhooks: true, maintenance: false,
  });
  const toggle = (key: string) => setToggles((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Platform Settings</h1>
          <p>Configure loan products, permissions, integrations, and system rules.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="two-col">
        <div className="col-stack">
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Loan Rules</div>
            <div className="col-stack">
              <button className="btn-primary"><Wrench size={14} /> Open Rule Engine</button>
              <button className="btn-secondary"><Banknote size={14} /> Edit Pricing & Fees</button>
              <button className="btn-secondary"><FileText size={14} /> Manage Loan Products</button>
              <button className="btn-secondary"><Calendar size={14} /> Configure Tenure Options</button>
            </div>
          </div>
          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Access Control</div>
            <div className="col-stack">
              <button className="btn-secondary"><Users size={14} /> Manage Permissions</button>
              <button className="btn-secondary"><Shield size={14} /> Role Configuration</button>
              <button className="btn-secondary"><Webhook size={14} /> View Webhooks</button>
              <button className="btn-danger"><UserX size={14} /> Revoke Access</button>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title" style={{ marginBottom: 4 }}>System Toggles</div>
          <div className="panel-sub" style={{ marginBottom: 16 }}>Enable or disable platform features</div>
          {[
            { key: "biometric",   Icon: Fingerprint, label: "Biometric Login",       sub: "Allow fingerprint/Face ID for admin login" },
            { key: "twofa",       Icon: Shield,      label: "Two-Factor Auth",        sub: "Require 2FA for all admin accounts" },
            { key: "autoApprove", Icon: CheckCircle, label: "Auto-Approve Low Risk",  sub: "Automatically approve score > 80" },
            { key: "webhooks",    Icon: Webhook,     label: "Webhook Notifications",  sub: "Send events to external endpoints" },
            { key: "maintenance", Icon: Wrench,      label: "Maintenance Mode",       sub: "Take the platform offline for users" },
          ].map(({ key, Icon, label, sub }) => (
            <div key={key} className="toggle-row">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color="var(--muted2)" />
                </div>
                <div>
                  <div className="toggle-info-title">{label}</div>
                  <div className="toggle-info-sub">{sub}</div>
                </div>
              </div>
              <button className={`toggle ${toggles[key] ? "on" : ""}`} onClick={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-title" style={{ marginBottom: 14 }}>Notification Templates</div>
        <div className="form-grid">
          {["Repayment Reminder", "Loan Approval", "KYC Approved", "Overdue Alert"].map((t) => (
            <div key={t} className="form-field">
              <label className="form-label">{t}</label>
              <input className="form-input" defaultValue={`Default ${t} message template...`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
