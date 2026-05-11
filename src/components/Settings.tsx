import React, { useState } from "react";

export default function Settings({ onNavigate }: { onNavigate: (p: string) => void }) {
	const [tab, setTab] = useState<"notifications" | "security" | "repayments" | "offers">(
		"notifications"
	);
	const [notifEmail, setNotifEmail] = useState(true);
	const [notifPush, setNotifPush] = useState(true);

	return (
		<section className="card settings">
			<h2>Settings</h2>
			<div className="settings-row">
				<nav className="settings-nav">
					<button className={tab === "notifications" ? "active" : ""} onClick={() => setTab("notifications")}>Notifications</button>
					<button className={tab === "security" ? "active" : ""} onClick={() => setTab("security")}>Security</button>
					<button className={tab === "repayments" ? "active" : ""} onClick={() => setTab("repayments")}>Repayments</button>
					<button className={tab === "offers" ? "active" : ""} onClick={() => setTab("offers")}>Offers</button>
				</nav>

				<div className="settings-panel">
					{tab === "notifications" && (
						<div>
							<h4>Notifications</h4>
							<label className="switch">
								<input type="checkbox" checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} />
								<span>Email notifications</span>
							</label>
							<label className="switch">
								<input type="checkbox" checked={notifPush} onChange={() => setNotifPush(!notifPush)} />
								<span>Push notifications</span>
							</label>
						</div>
					)}
					{tab === "security" && (
						<div>
							<h4>Security</h4>
							<p>Change password, two-factor authentication (placeholder)</p>
							<button className="btn" onClick={() => alert("2FA toggled (mock)")}>Toggle 2FA</button>
						</div>
					)}
					{tab === "repayments" && (
						<div>
							<h4>Repayments</h4>
							<p>Manage repayment methods and schedules.</p>
							<button className="btn" onClick={() => onNavigate("repayments")}>View repayments page</button>
						</div>
					)}
					{tab === "offers" && (
						<div>
							<h4>Offers</h4>
							<p>Manage promotional communications and targeted offers.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
