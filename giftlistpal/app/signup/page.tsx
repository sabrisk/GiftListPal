"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useFormik } from "formik";

interface SignUp {
	email: string;
}

export default function SignUp() {
	const router = useRouter();
	const params = useSearchParams();
	const { data: session, status } = useSession();

	const handleSubmit = async (values: SignUp) => {
		try {
			await signIn("resend", {
				email: values.email,
				redirect: true,
				callbackUrl: params.get("callbackUrl") || "/setup-profile",
			});
		} catch (err) {
			console.error(err);
		}
	};

	const validate = (values: SignUp) => {
		const errors: Partial<SignUp> = {};
		if (!values.email) {
			errors.email = "*Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validate: validate,
		onSubmit: handleSubmit,
	});

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
				<h1 className=" ">
					Sign in to continue to the Event Dashboard
				</h1>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 max-w-md w-full"
				>
					<label className="flex flex-col">
						<input
							onChange={formik.handleChange}
							id="email"
							type="email"
							name="email"
							className="border rounded pl-6 pr-3 py-3 text-lg text-white"
							autoComplete="email"
							value={formik.values.email}
							onBlur={formik.handleBlur}
							placeholder="Email address*"
						/>
					</label>
					{formik.touched.email && formik.errors.email ? (
						<div className="">{formik.errors.email}</div>
					) : null}
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
	if (status === "loading" || status === "authenticated") {
		return loading;
	}

	return signUpCode;
}
