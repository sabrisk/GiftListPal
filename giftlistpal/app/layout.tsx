"use client";
// app/layout.tsx
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // adjust path if needed
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";

const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
	e.preventDefault();
	await signOut({ callbackUrl: "/signup" });
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<SessionProvider>
				<body>
					<button
						onClick={handleClick}
						className="hidden md:block bg-[#F5EFE7] text-[#313131] font-bold border-1 rounded border-[#F5EFE7] px-2 "
					>
						Sign Out
					</button>
					<Provider store={store}>{children}</Provider>
				</body>
			</SessionProvider>
		</html>
	);
}
