export const dynamic = "force-dynamic";

import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // adjust path if needed
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={"dark"} lang="en">
			<SessionProvider>
				<Provider store={store}>
					<body className="">
						<main className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 md:px-8">
							<NavBar />
							{children}
							<Toaster
								position="top-center"
								theme="dark"
								duration={6000}
								toastOptions={{
									style: {
										background: "#364153",
										border: "1px solid #45556c",
										fontSize: "1rem",
										color: "#ffffff",
										borderRadius: ".2em",
									},
								}}
							/>
						</main>
					</body>
				</Provider>
			</SessionProvider>
		</html>
	);
}
