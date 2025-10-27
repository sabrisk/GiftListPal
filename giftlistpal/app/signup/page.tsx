"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignUp() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [user, setUser] = useState({
		email: "",
	});

	const resendAction = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await signIn("resend", { ...user, redirect: false });
		console.log(res);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(name, value);
		setUser((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		document.title = `Sign in | GiftListPal`;
	}, []);

	useEffect(() => {
		if (status === "authenticated") {
			router.replace("/events"); // replace prevents “back” navigation flash
		}
	}, [status, router]);

	const signUpCode = (
		<div>
			<h1 className="text-3xl p-3 mt-15">Sign up</h1>
			<form
				onSubmit={resendAction}
				className="flex flex-col p-3 gap-4 mt-6 max-w-sm mx-auto"
			>
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
				<button
					type="submit"
					className="mt-4 bg-[#F5EFE7] hover:bg-[#beb7af] text-black font-semibold py-2 rounded"
				>
					Continue
				</button>
			</form>
		</div>
	);

	const loading = <div>Loading...</div>;
	if (status === "loading") {
		return loading;
	}

	return signUpCode;
}
