"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AuthGuardProps {
	children: ReactNode;
	redirectTo?: string;
}

export default function AuthGuard({
	children,
	redirectTo = "/signup",
}: AuthGuardProps) {
	const { status } = useSession();
	const router = useRouter();

	// Handle redirect for unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace(redirectTo);
		}
	}, [status, router, redirectTo]);

	// Prevent rendering while session is loading or unauthenticated
	if (status === "loading" || status === "unauthenticated") {
		return null; // Could render a spinner instead
	}

	return <>{children}</>;
}
