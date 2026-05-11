import React, { useState } from "react";

export default function Profile({
	user,
	update,
}: {
	user: { name: string; email: string; photo: string; balance?: number };
	update: (u: Partial<typeof user>) => void;
}) {
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [preview, setPreview] = useState<string>(user.photo);

	function onPick(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(String(reader.result));
		};
		reader.readAsDataURL(file);
	}

	function save() {
		update({ name, email, photo: preview });
		alert("Profile saved (mock)");
	}

	return (
		<section className="card profile-edit">
			<h2>Profile</h2>
			<div className="profile-edit-grid">
				<div className="profile-edit-left">
					<div className="avatar-large">
						{preview ? <img src={preview} alt="avatar" /> : <div className="placeholder">JD</div>}
					</div>
					<label className="upload-btn">
						<input type="file" accept="image/*" onChange={onPick} />
						Upload photo
					</label>
				</div>
				<div className="profile-edit-right">
					<label>
						Name
						<input value={name} onChange={(e) => setName(e.target.value)} />
					</label>
					<label>
						Email
						<input value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
					<div className="row">
						<button className="btn primary" onClick={save}>Save</button>
					</div>
				</div>
			</div>
		</section>
	);
}
