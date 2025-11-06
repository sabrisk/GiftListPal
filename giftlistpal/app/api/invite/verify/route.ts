// app/api/invite/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../auth";
import { VerifySuccessResponse, VerifyErrorResponse } from "@/types/verify";

const successResponse = (eventId: number): VerifySuccessResponse => ({
	success: true,
	data: { eventId },
});
const errorResponse = (code: string): VerifyErrorResponse => ({
	success: false,
	code,
});

export async function GET(req: Request) {
	console.log("inside invite verify route");
	const url = new URL(req.url);
	const token = url.searchParams.get("token");
	console.log("token:", token);
	const session = await auth();
	if (!session?.user?.id) {
		return NextResponse.json(errorResponse("UNAUTHORIZED"), {
			status: 401,
		});
	}
	if (!token)
		return NextResponse.json(errorResponse("TOKEN_NOT_FOUND"), {
			status: 400,
		});

	const invite = await prisma.eventInvite.findUnique({ where: { token } });
	if (!invite || invite.used || invite.expiresAt < new Date()) {
		return NextResponse.json(errorResponse("INVITE_EXPIRED"), {
			status: 410,
			headers: {
				"Cache-Control": "no-store",
			},
		});
	}

	if (!session?.user?.email) {
		// redirect them to sign in (or auto-trigger NextAuth email signin)
		const signInUrl = `/api/auth/signin/email?callbackUrl=/invite/accept?token=${token}`;
		return NextResponse.redirect(signInUrl);
	}

	// Match the logged-in user’s email to invite
	if (invite.email !== session.user.email) {
		return NextResponse.json(errorResponse("INVALID_USER"), {
			status: 403,
		});
	}

	// Add them to the event (example)
	await prisma.eventParticipant.create({
		data: {
			userId: session.user.id,
			eventId: invite.eventId,
			isShopper: false, //these need to be set either in the invite table or somewhere else
			isRecipient: false,
		},
	});

	// Mark invite as used
	await prisma.eventInvite.update({
		where: { token },
		data: { used: true },
	});

	return NextResponse.json(successResponse(invite.eventId));
}
