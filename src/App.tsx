import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import KYC from "./components/KYC";
import Settings from "./components/Settings";
import "./styles.css";

type Page =
	| "home"
	| "profile"
	| "transactions"
	| "kyc"
	| "settings"
	| "help"
	| "offers"
	| "repayments"
	| "rewards";

export default function App() {
	const [page, setPage] = useState<Page>("home");
	const [user, setUser] = useState({
		name: "Jane Doe",
		email: "jane@example.com",
		balance: 1250.5,
		photo: "" as string, // data URL
	});
	const [kycStatus, setKycStatus] = useState<"not_started" | "pending" | "verified">(
		"not_started"
	);

	return (
		<div className="app">
			<Header onNavigate={setPage} current={page} userPhoto={user.photo} />
			<main className="container">
				{page === "home" && (
					<Home user={user} onNavigate={setPage} />
				)}
				{page === "profile" && (
					<Profile
						user={user}
						update={(updates) => setUser((u) => ({ ...u, ...updates }))}
					/>
				)}
				{page === "kyc" && (
					<KYC
						status={kycStatus}
						onStart={() => setKycStatus("pending")}
						onConfirm={() => setKycStatus("verified")}
					/>
				)}
				{page === "settings" && (
					<Settings onNavigate={setPage} />
				)}
				{page === "transactions" && (
					<section className="card">
						<h2>Transactions</h2>
						<p>Simple transactions list (placeholder) — keeps original basic look.</p>
					</section>
				)}
				{page === "help" && (
					<section className="card">
						<h2>Help & Support</h2>
						<p>Contact options and FAQs.</p>
					</section>
				)}
				{page === "offers" && (
					<section className="card">
						<h2>Offers</h2>
						<p>Special offers for you.</p>
					</section>
				)}
				{page === "repayments" && (
					<section className="card">
						<h2>Repayments</h2>
						<p>Repayment schedule & quick pay.</p>
					</section>
				)}
				{page === "rewards" && (
					<section className="card">
						<h2>Rewards</h2>
						<p>Your rewards and cashback.</p>
					</section>
				)}
			</main>
		</div>
	);
}
