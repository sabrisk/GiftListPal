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
			try {
				const res = await fetch(`/api/invite/verify?token=${token}`);
				const responseData = await res.json();

				if (!res.ok || !responseData.success) {
					router.replace(
						`/invite/invalid?error=${responseData.code}`
					);
					return;
				}
				router.replace(
					`/events/${responseData.data.eventId}/participants`
				);
			} catch (err) {
				console.error(err);
				router.replace(`/invite/invalid?error=NETWORK`);
			}
		};

		verifyInvite();
	}, [token, router]);

	return <p>Processing your invite...</p>;
}
