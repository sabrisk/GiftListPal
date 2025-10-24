import { NextResponse } from "next/server";

// Fake in-memory database
import participants from "@lib/fakeDb";

export async function GET(
	req: Request,
	context: { params: Promise<{ id: string }> } // params is now a Promise
) {
	const { params } = context;
	const { id } = await params; // await it!
	const eventId = parseInt(id, 10);

	const eventParticipants = participants.filter(
		(participant) => participant.event_id === eventId
	);

	console.log(eventParticipants);

	return NextResponse.json(eventParticipants, { status: 200 });
}
