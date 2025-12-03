"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const InvalidInvite = () => {
	const searchParams = useSearchParams();
	const code = searchParams.get("error");
	let content = null;

	switch (code) {
		case "UNAUTHORIZED":
			content = (
				<>
					<p className="inline">Please </p>
					<Link className="underline" href={"/signup"}>
						login
					</Link>
					<span>.</span>
				</>
			);
			break;
		case "TOKEN_NOT_FOUND":
			content = <p>Error: No token was found.</p>;
			break;
		case "INVITE_EXPIRED":
			content = (
				<>
					<p>
						Error: This invite link has expired. Please contact the
						event owner to request a new invite.
					</p>
					<p className="inline">Return to </p>
					<Link className="underline" href={"/events"}>
						Events
					</Link>
					<span>.</span>
				</>
			);
			break;
		case "INVALID_USER":
			content = (
				<p>
					Error: This invitation is not meant for the currently logged
					in user. Please sign out and log in using the email address
					of the invitation recipient.
				</p>
			);
			break;
		case "NETWORK":
			content = <p>Error: Connection error. Please try again later.</p>;
			break;
		default:
	}

	return <div>{content}</div>;
};

export default InvalidInvite;
