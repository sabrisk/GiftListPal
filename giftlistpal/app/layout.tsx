"use client";
// app/layout.tsx
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // adjust path if needed
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<SessionProvider>
				<body className="max-w-6xl mx-auto px-7 sm:px-14">
					<NavBar />
					<Provider store={store}>{children}</Provider>
				</body>
			</SessionProvider>
		</html>
	);
}
