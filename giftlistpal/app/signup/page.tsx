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
		const res = await signIn("resend", {
			...user,
			redirect: true,
			callbackUrl: "/setup-profile",
		});
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
		<div className="flex pt-20 sm:pt-0 sm:min-h-screen justify-center items-center">
			<div className="flex flex-col gap-8 items-center max-w-md mx-auto sm:p-12 rounded-md  sm:bg-gray-700  sm:border-slate-600 sm:border-1 mt-10 mb-10">
				<h1 className="text-3xl  font-bold">GiftListPal</h1>
				<h2 className="text-2xl ">Welcome</h2>
				<h1 className=" ">Sign in to continue to the Gift Dashboard</h1>
				<form
					onSubmit={resendAction}
					className="flex flex-col gap-4 max-w-md w-full"
				>
					<label className="flex flex-col">
						<input
							onChange={handleChange}
							type="email"
							name="email"
							className="border rounded pl-6 pr-3 py-3 text-lg text-white"
							required
							autoComplete="email"
							value={user.email}
							placeholder="Email address*"
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
		</div>
	);

	const loading = <div>Loading...</div>;
	if (status === "loading") {
		return loading;
	}

	return signUpCode;
}
