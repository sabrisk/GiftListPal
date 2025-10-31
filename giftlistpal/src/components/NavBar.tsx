"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

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
				<nav className="flex justify-end items-start mt-8 mb-15">
					{session?.user?.name}
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
