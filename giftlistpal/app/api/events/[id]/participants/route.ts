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

// export async function POST(req: Request) {
// 	const session = await auth();
// 	if (!session?.user?.id) {
// 		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// 	}
// 	const userId = session.user.id;
// 	try {
// 		const { name, date, description }: EventRequestBody = await req.json();

// 		const event = await prisma.$transaction(async (tx) => {
// 			const event = await tx.event.create({
// 				data: {
// 					name,
// 					date: new Date(date),
// 					description,
// 					ownerId: userId,
// 				},
// 			});

// 			await tx.eventParticipant.create({
// 				data: {
// 					userId,
// 					eventId: event.id,
// 					isShopper: false,
// 					isRecipient: false,
// 				},
// 			});

// 			const fullEvent = await tx.event.findUnique({
// 				where: { id: event.id },
// 				select: {
// 					id: true,
// 					name: true,
// 					date: true,
// 					description: true,
// 					ownerId: true,
// 					createdAt: true,
// 					participants: {
// 						select: {
// 							isShopper: true,
// 							isRecipient: true,
// 							user: {
// 								select: {
// 									id: true,
// 									firstName: true,
// 									lastName: true,
// 									email: false, // or true if appropriate
// 									image: false,
// 								},
// 							},
// 						},
// 					},
// 				},
// 			});

// 			return fullEvent;
// 		});

// 		console.log("Created event:", event?.participants[0].user);

// 		return NextResponse.json(event, { status: 201 });
// 	} catch (err) {
// 		console.error("Error inserting event:", err);
// 		return NextResponse.json(
// 			{ error: "Database insert failed" },
// 			{ status: 500 }
// 		);
// 	}
// }
export async function OPTIONS() {
	return NextResponse.json(
		{ error: "Method Not Allowed" },
		{
			status: 405,
			headers: { Allow: "GET, POST" },
		}
	);
}
