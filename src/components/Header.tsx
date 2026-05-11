import React from "react";

export default function Header({
	onNavigate,
	current,
	userPhoto,
}: {
	onNavigate: (p: string) => void;
	current: string;
	userPhoto?: string;
}) {
	return (
		<header className="header">
			<div className="brand">
				<div className="logo">YES<span className="accent">.</span>Credit</div>
				<nav className="nav">
					<button className={current === "home" ? "active" : ""} onClick={() => onNavigate("home")}>Home</button>
					<button className={current === "profile" ? "active" : ""} onClick={() => onNavigate("profile")}>Profile</button>
					<button className={current === "transactions" ? "active" : ""} onClick={() => onNavigate("transactions")}>Transactions</button>
					<button className={current === "kyc" ? "active" : ""} onClick={() => onNavigate("kyc")}>KYC</button>
					<button className={current === "settings" ? "active" : ""} onClick={() => onNavigate("settings")}>Settings</button>
				</nav>
			</div>
			<div className="actions">
				{userPhoto ? (
					<img src={userPhoto} alt="avatar" className="avatar" />
				) : (
					<div className="avatar placeholder">JD</div>
				)}
			</div>
		</header>
	);
}
