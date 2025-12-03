export const dynamic = "force-dynamic";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar";
import { Providers } from "@/components/Providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className="dark" lang="en">
			<body>
				<Providers>
					<main className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 md:px-8">
						<NavBar />
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
