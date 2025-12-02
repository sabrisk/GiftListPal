"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {
	getUser,
	selectUserStatus,
	selectUser,
} from "@/features/User/userSlice";
import { Noto_Sans } from "next/font/google";
const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["500"],
});

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import Link from "next/link";

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

	const hideNavbar = pathname === "/signup";

	if (status === "loading") {
		return null;
	}

	const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await signOut({ callbackUrl: "/" });
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
				<nav className="flex items-center justify-between  mt-12 mb-14">
					<Link
						href={"/"}
						className=" border-b border-b-transparent hover:border-b-white"
					>
						<span
							className={`text-3xl border-b border-b-transparent ${notoSans.className}`}
						>
							GiftListPal
						</span>
					</Link>
					<div className="flex ">
						{status === "authenticated" && (
							<Link href={"/events"}>
								<div className="py-1 mr-10  cursor-pointer ">
									<span className="text-xl border-b border-b-transparent hover:border-b-white">
										Events
									</span>
								</div>
							</Link>
						)}
						<div className="py-1 md:mr-10  cursor-pointer ">
							<span className=" text-xl pb-1 border-b border-b-transparent hover:border-b-white">
								{user?.name}
							</span>
						</div>
						<button
							onClick={handleClick}
							className="hidden md:block text-[#f5efe7] font-bold border-1 rounded border-[#f5efe7] px-3 py-1"
						>
							{buttonTitle}
						</button>
					</div>
				</nav>
			)}
		</>
	);
}
