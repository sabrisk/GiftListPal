// app/api/invite/verify/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../auth";

export async function GET(req: Request) {
	console.log("inside invite verify route");
	debugger;
	const url = new URL(req.url);
	const token = url.searchParams.get("token");
	console.log("token:", token);
	// const session = await getServerSession(authOptions);
	const session = await auth();
	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	console.log("session user:", session.user);
	if (!token) return NextResponse.json({ valid: false });

	const invite = await prisma.eventInvite.findUnique({ where: { token } });
	console.log("invite:", invite);
	if (!invite || invite.used || invite.expiresAt < new Date()) {
		return NextResponse.json({ valid: false });
	}

	if (!session?.user?.email) {
		// redirect them to sign in (or auto-trigger NextAuth email signin)
		const signInUrl = `/api/auth/signin/email?callbackUrl=/invite/accept?token=${token}`;
		return NextResponse.redirect(signInUrl);
	}

	// Match the logged-in user’s email to invite
	if (invite.email !== session.user.email) {
		return NextResponse.json({ valid: false });
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

	return NextResponse.json({ valid: true, eventId: invite.eventId });
}
