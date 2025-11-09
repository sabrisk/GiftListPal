"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {
	getUser,
	selectUserStatus,
	selectUser,
} from "@/features/User/userSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export default function Navbar() {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const user = useAppSelector(selectUser);
	const router = useRouter();
	const pathname = usePathname();
	const userId = session?.user?.id;
	useEffect(() => {
		//userId to ensure user logged in
		if (userStatus === "idle" && status === "authenticated" && userId) {
			dispatch(getUser(userId));
		}
	}, [userStatus, status, userId, dispatch]);

	const hideNavbar = pathname === "/signup"; // or "/signup"

	if (status === "loading") {
		// Prevent SSR/client mismatch
		return null;
	}

	// if (status === "unauthenticated") {
	// 	return null;
	// }
	const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await signOut({ callbackUrl: "/signup" });
	};
	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push("/signup");
	};
	const buttonTitle = status === "authenticated" ? "Sign Out" : "Log In";
	const handleClick =
		status === "authenticated" ? handleSignOut : handleLogin;

	return (
		<>
			{!hideNavbar && (
				<nav className="flex items-center justify-end  mt-12 mb-14">
					<div className="py-1 mr-10  cursor-pointer ">
						<span className=" text-xl pb-1 border-b border-b-transparent hover:border-b-white">
							{user?.name}
						</span>
						<span className="inline-block my-auto text-sm ml-2">
							{"▼"}
						</span>
					</div>
					<button
						onClick={handleClick}
						className="hidden md:block text-[#f5efe7] font-bold border-1 rounded border-[#f5efe7] px-3 py-1"
					>
						{buttonTitle}
					</button>
				</nav>
			)}
		</>
	);
}
