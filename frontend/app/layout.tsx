"use client";
// app/layout.tsx
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store"; // adjust path if needed

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>{children}</Provider>
			</body>
		</html>
	);
}
