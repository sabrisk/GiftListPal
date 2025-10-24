"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignUp() {
	const [user, setUser] = useState({
		// name: "",
		email: "",
		// password: "",
		// confirmPassword: "",
	});

	const resendAction = (formData: FormData) => {
		signIn("resend", user);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(e.target);
		setUser((prev) => ({ ...prev, [name]: value }));
		console.log(user);
	};

	// const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	e.preventDefault();

	// 	if (user.password !== user.confirmPassword) {
	// 		alert("Passwords do no match!");
	// 		return;
	// 	}

	// 	localStorage.setItem("user", JSON.stringify(user));

	// 	try {
	// 		const response = await fetch("http://localhost:3001/signup", {
	// 			method: "POST",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(user),
	// 		});

	// 		if (!response.ok) {
	// 			const error = await response.text();
	// 			alert(`Signup failed: ${error}`);
	// 			return;
	// 		}

	// 		const jsonResponse = await response.json();
	// 		// do other things like redirect users to another page
	// 	} catch (error) {
	// 		alert("An error occurred");
	// 	}
	// };

	return (
		<div>
			<h1 className="text-3xl p-3 bg-gray-800">Sign up</h1>
			<form
				action={resendAction}
				className="flex flex-col p-3 gap-4 mt-6 max-w-sm mx-auto"
			>
				{/* <label className="flex flex-col">
					<span className="mb-1 font-medium">Name</span>
					<input
						onChange={handleChange}
						type="text"
						name="name"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						value={user.name}
					/>
				</label> */}
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Email</span>
					<input
						onChange={handleChange}
						type="email"
						name="email"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						autoComplete="email"
						value={user.email}
					/>
				</label>
				{/* <label className="flex flex-col">
					<span className="mb-1 font-medium">Password</span>
					<input
						onChange={handleChange}
						type="password"
						name="password"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						autoComplete="new-password"
						value={user.password}
					/>
				</label>
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Confirm Password</span>
					<input
						onChange={handleChange}
						type="password"
						name="confirmPassword"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						autoComplete="new-password"
						value={user.confirmPassword}
					/>
				</label> */}
				<button
					// onClick={handleClick}
					type="submit"
					className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
