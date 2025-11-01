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
				<body className="">
					<main className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 md:px-8">
						<NavBar />
						<Provider store={store}>{children}</Provider>
					</main>
				</body>
			</SessionProvider>
		</html>
	);
}
