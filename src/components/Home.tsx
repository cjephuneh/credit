import React from "react";

export default function Home({
	user,
	onNavigate,
}: {
	user: { name: string; balance: number; photo: string };
	onNavigate: (p: string) => void;
}) {
	return (
		<section className="home-grid">
			<div className="card profile-card">
				<div className="profile-left">
					{user.photo ? (
						<img src={user.photo} alt="User" className="profile-photo" />
					) : (
						<div className="profile-photo placeholder">JD</div>
					)}
				</div>
				<div className="profile-right">
					<h3>{user.name}</h3>
					<p className="muted">Welcome back — manage your credit smartly</p>
					<div className="balance">
						<div>Available</div>
						<div className="big">${user.balance.toFixed(2)}</div>
					</div>
				</div>
			</div>

			<div className="card actions-card">
				<h4>Quick actions</h4>
				<div className="actions-row">
					<button className="btn primary" onClick={() => onNavigate("repayments")}>Pay</button>
					<button className="btn" onClick={() => onNavigate("transactions")}>Transactions</button>
					<button className="btn" onClick={() => onNavigate("offers")}>Offers</button>
					<button className="btn" onClick={() => onNavigate("kyc")}>KYC</button>
				</div>
			</div>

			<div className="card">
				<h4>Overview</h4>
				<p>Quick snapshot and recommendations.</p>
			</div>
		</section>
	);
}
