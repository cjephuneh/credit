import React, { useState } from "react";

export default function KYC({
	status,
	onStart,
	onConfirm,
}: {
	status: "not_started" | "pending" | "verified";
	onStart: () => void;
	onConfirm: () => void;
}) {
	const [selfie, setSelfie] = useState<string | null>(null);
	const [idFile, setIdFile] = useState<string | null>(null);

	function onCapture(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setSelfie(String(reader.result));
		reader.readAsDataURL(file);
		onStart();
	}

	function onPickId(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => setIdFile(String(reader.result));
		reader.readAsDataURL(file);
	}

	function confirm() {
		if (!selfie || !idFile) {
			alert("Please upload selfie and ID to confirm.");
			return;
		}
		// mock API delay
		setTimeout(() => {
			onConfirm();
			alert("KYC verified (mock).");
		}, 900);
	}

	return (
		<section className="card">
			<h2>KYC Center</h2>
			<p className="muted">Status: <strong>{status}</strong></p>

			<div className="kyc-grid">
				<div className="kyc-card">
					<h4>1. Take a selfie</h4>
					<input
						accept="image/*"
						capture="user"
						type="file"
						onChange={onCapture}
					/>
					{selfie && <img src={selfie} alt="selfie" className="preview" />}
				</div>

				<div className="kyc-card">
					<h4>2. Upload ID</h4>
					<input accept="image/*,application/pdf" type="file" onChange={onPickId} />
					{idFile && <img src={idFile} alt="id" className="preview" />}
				</div>
			</div>

			<div className="row">
				<button className="btn primary" onClick={confirm}>
					Confirm & Submit
				</button>
			</div>
		</section>
	);
}
