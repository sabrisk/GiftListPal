"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AcceptInvitePage() {
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get("token");

	useEffect(() => {
		console.log("inside AcceptInvitePage useEffect", token);
		if (!token) return;

		const verifyInvite = async () => {
			const res = await fetch(`/api/invite/verify?token=${token}`);
			const data = await res.json();

			if (data.valid) {
				router.replace(`/events/${data.eventId}/participants`);
			} else {
				router.replace("/invite/invalid");
			}
		};

		verifyInvite();
	}, [token, router]);

	return <p>Processing your invite...</p>;
}
