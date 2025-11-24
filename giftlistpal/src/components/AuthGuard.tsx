"use client";
import React, { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUser, selectUserStatus } from "@/features/User/userSlice";

interface AuthGuardProps {
	children: ReactNode;
	// redirectTo?: string;
}

export default function AuthGuard({
	children,
}: // redirectTo = "/signup",
AuthGuardProps) {
	const { data: session, status } = useSession();
	const router = useRouter();
	const user = useAppSelector(selectUser);
	const userStatus = useAppSelector(selectUserStatus);
	const pathname = usePathname();
	const isProfileSetupPage = pathname.startsWith("/setup-profile");
	useEffect(() => {
		if (status === "loading") return;

		if (status === "unauthenticated") {
			router.replace("/signup");
			return;
		}

		// const isProfileSetupPage = pathname.startsWith("/setup-profile");
		if (userStatus === "succeeded" && !user?.name && !isProfileSetupPage) {
			router.replace("/setup-profile");
			return;
		}
		if (userStatus === "succeeded" && user?.name && isProfileSetupPage) {
			router.replace("/events");
			return;
		}
	}, [status, userStatus, user, pathname, router]);
	try {
		const isReady =
			status === "authenticated" && userStatus === "succeeded";
		if (!isReady) return null; //maybe a loading spinner

		if (isReady && isProfileSetupPage && user?.name) {
			return <></>; // invisible fragment, but still mounts
		}

		if (isReady && !isProfileSetupPage && !user?.name) {
			return <></>; // invisible fragment, but still mounts
		}

		return <>{children}</>;
	} catch (err) {
		console.log(err);
	}
}
