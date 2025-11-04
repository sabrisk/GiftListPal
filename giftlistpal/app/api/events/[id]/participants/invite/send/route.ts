// app/api/invite/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

interface SuccessResponse {
	success: true;
	message: string;
}

interface ErrorResponse {
	success: false;
	code: string;
	message: string;
}

const successResponse = (message: string): SuccessResponse => ({
	success: true,
	message,
});
const errorResponse = (code: string, message: string): ErrorResponse => ({
	success: false,
	code,
	message,
});

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const { eventId, email } = await req.json();

		if (!eventId || !email) {
			return NextResponse.json(
				errorResponse("BAD_REQUEST", "Missing eventId or email"),
				{ status: 400 }
			);
		}

		const token = crypto.randomBytes(32).toString("hex");
		const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // expires in 24 hours

		const dbResult = await prisma.$transaction(async (tx) => {
			const participant = await tx.eventParticipant.findFirst({
				where: {
					eventId,
					user: {
						email,
					},
				},
			});
			if (participant) {
				return errorResponse(
					"ALREADY_PARTICIPANT",
					"This person is already in the event"
				);
			}

			const existingInvite = await tx.eventInvite.findFirst({
				where: {
					eventId,
					email,
					used: false,
					expiresAt: {
						gt: new Date(),
					},
				},
			});
			if (existingInvite) {
				return errorResponse(
					"INVITE_ALREADY_SENT",
					"An active invite has already been sent to this email"
				);
			}

			await tx.eventInvite.create({
				data: { eventId, email, token, expiresAt },
			});

			return successResponse("Invite successfully created");
		});

		if (!dbResult.success) {
			const status = dbResult.code === "ALREADY_PARTICIPANT" ? 409 : 400;
			return NextResponse.json(dbResult, { status });
		}

		const inviteUrl = `${
			process.env.NEXTAUTH_URL
		}/invite/accept?token=${encodeURIComponent(token)}`;
		try {
			await resend.emails.send({
				from: "Invite@mail.giftlistpal.com",
				to: email,
				subject: "GiftListPal | You’ve been invited to an event!",
				html: `
			  <p>You've been invited to join an event.</p>
			  <p><a href="${inviteUrl}">Click here to accept your invite</a></p>
			`,
			});
		} catch (err) {
			console.error("Email sending failed:", err);
			return NextResponse.json(
				errorResponse("EMAIL_FAILED", "Failed to send invite email"),
				{ status: 502 }
			);
		}
		return NextResponse.json(successResponse("Invite sent successfully"));
	} catch (error) {
		console.error("Unhandled error in invite route:", error);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
			{ status: 500 }
		);
	}
}
