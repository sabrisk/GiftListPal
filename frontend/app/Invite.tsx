import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

import { useState } from "react";

export default function Invite() {
	const [invite, setInvite] = useState({
		name: "",
		email: "",
		description: "",
		type: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		console.log(e.target);
		setInvite((prev) => ({ ...prev, [name]: value }));
	};

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		localStorage.setItem("invite", JSON.stringify(invite));

		try {
			const response = await fetch("http://localhost:3001/Invite", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invite),
			});

			if (!response.ok) {
				const error = await response.text();
				alert(`Invite failed: ${error}`);
				return;
			}

			const jsonResponse = await response.json();
			// do other things like redirect users to another page
		} catch (error) {
			alert("An error occurred");
		}
	};

	return (
		<div className="p-3">
			<header className="flex justify-end items-start">
				<button
					className="fixed top-0 left-0 w-12 h-12 pb-1 bg-gray-600 text-white text-4xl border border-slate-600 flex items-center justify-center  hover:bg-gray-500 transition-colors"
					aria-label="Back"
				>
					&lsaquo;
				</button>
			</header>
			<header className="flex flex-col items-center">
				<h1 className="text-3xl mt-15 mb-6 font-bold">Invite</h1>
				<h1 className="text-2xl mt-2mb-6 ">Christmas 2025</h1>
			</header>
			<form className="flex flex-col gap-4 mt-6 max-w-sm mx-auto">
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Name</span>
					<input
						onChange={handleChange}
						type="text"
						name="name"
						autoComplete="off"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						maxLength={36}
						value={invite.name}
					/>
				</label>
				<label className="flex flex-col">
					<span className="mb-1 font-medium">E-mail</span>
					<input
						onChange={handleChange}
						type="text"
						name="email"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						value={invite.email}
					/>
				</label>

				<RadioGroup
					value={invite.type}
					onValueChange={(value: string) =>
						setInvite((prev) => ({ ...prev, type: value }))
					}
				>
					<div className="flex items-center gap-3">
						<RadioGroupItem value="shopper" id="shopper" />
						<Label htmlFor="shopper">Shopper</Label>
					</div>
					<div className="flex items-center gap-3">
						<RadioGroupItem value="recipient" id="recipient" />
						<Label htmlFor="recipient">Recipient</Label>
					</div>
					<div className="flex items-center gap-3">
						<RadioGroupItem value="both" id="both" />
						<Label htmlFor="both">Both</Label>
					</div>
				</RadioGroup>

				<button
					onClick={handleClick}
					type="submit"
					className="mt-4  bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
				>
					Send Invite
				</button>
			</form>
		</div>
	);
}

{
	/* <button
					className="bg-gray-600 text-white text-4xl border border-slate-600 flex items-center justify-center  hover:bg-gray-500 transition-colors"
					aria-label="Back"
				>
					&lsaquo;
				</button> */
}
