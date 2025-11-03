import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../../auth";
import { participantSelect } from "@lib/prismaSelects";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	const eventId = id ? Number(id) : undefined;
	// console.log(eventId);
	// console.log(`Hi there GET /api/events/${eventId}/participants/`);
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		console.log("Fetching participants for event:", session.user.id);

		const participants = await prisma.eventParticipant.findMany({
			where: {
				eventId, // only include join rows for this event
			},
			select: participantSelect,
		});

		const flattenedParticipants = participants.map((p) => ({
			id: p.user.id,
			name: p.user.name,
			isShopper: p.isShopper,
			isRecipient: p.isRecipient,
		}));

		console.log("Retrieved participants:", flattenedParticipants);
		return NextResponse.json(flattenedParticipants, { status: 200 });
	} catch (err) {
		console.error("Error getting participants:", err);
		return NextResponse.json(
			{ error: "Database get failed" },
			{ status: 500 }
		);
	}
}

export async function OPTIONS() {
	return NextResponse.json(
		{ error: "Method Not Allowed" },
		{
			status: 405,
			headers: { Allow: "GET, POST" },
		}
	);
}
