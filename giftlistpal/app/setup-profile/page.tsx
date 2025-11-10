"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { patchUser } from "@/features/User/userSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthGuard from "@/components/AuthGuard";
import { selectUser } from "@/features/User/userSlice";

export default function SetupProfile() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data: session, status } = useSession();
	const user = useAppSelector(selectUser);

	// const userId = session?.user?.id;

	const [updatedUser, setUpdatedUser] = useState<{
		uid: string; // optional
		name: string;
	}>({
		uid: "",
		name: "",
	});

	useEffect(() => {
		const user = session?.user;
		if (user?.id) {
			setUpdatedUser((prev) => ({ ...prev, uid: user.id! }));
		}
		if (user?.name) {
			setUpdatedUser((prev) => ({ ...prev, name: user.name! }));
		}
	}, [session]);

	// useEffect(() => {
	// 	if (user?.name) {
	// 		// debugger;
	// 		router.push("/events");
	// 	}
	// }, [user, router]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setUpdatedUser((prev) => ({ ...prev, [name]: value }));
	};

	// if (!session?.user?.id) {
	// 	return null;
	// }

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			if (!updatedUser.id || !updatedUser.name.trim()) return;
			const result = await dispatch(patchUser(updatedUser)).unwrap();
			// if (result.name) {
			// 	router.push("/events");
			// }
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AuthGuard>
			<div className="p-3 ">
				<header className="flex justify-end items-start"></header>
				<header className="flex flex-col items-center">
					<h1 className="text-3xl mt-15 mb-6 font-bold">
						What's your name?
					</h1>
				</header>
				<form className="flex flex-col gap-4 mt-6 max-w-sm mx-auto">
					<label className="flex flex-col">
						<span className="mb-1 font-medium">Display Name</span>
						<input
							onChange={handleChange}
							type="text"
							name="name"
							autoComplete="off"
							className="border rounded px-3 py-2"
							required
							maxLength={36}
							value={updatedUser.name}
						/>
					</label>
					<button
						onClick={handleClick}
						type="submit"
						className="mt-4 bg-[var(--primary)] text-[var(--primary-text)] font-semibold py-2 rounded"
					>
						Continue
					</button>
				</form>
			</div>
		</AuthGuard>
	);
}
