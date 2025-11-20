import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../../../../../auth";

import {
	CreateGiftRequestPost,
	SuccessResponse,
	ErrorResponse,
} from "@/types/gift";

const successResponse = <T>(data: T, message: string): SuccessResponse<T> => ({
	success: true,
	data,
	message,
});

const errorResponse = (code: string, message: string): ErrorResponse => ({
	success: false,
	code,
	message,
});

// export async function GET() {
// 	try {
// 		console.log("GET /api/events called");
// 		const session = await auth();

// 		if (!session?.user?.id) {
// 			return NextResponse.json(
// 				errorResponse("UNAUTHORIZED", "Unauthorized"),
// 				{ status: 401 }
// 			);
// 		}

// 		console.log("Fetching events for user:", session.user.id);
// 		const events = await prisma.event.findMany({
// 			where: { participants: { some: { userId: session.user.id } } },
// 			select: {
// 				id: true,
// 				name: true,
// 				date: true,
// 				description: true,
// 				ownerId: true,
// 				createdAt: true,
// 			},
// 		});
// 		return NextResponse.json(
// 			successResponse(events, "Events retreived successfully"),
// 			{
// 				status: 200,
// 			}
// 		);
// 	} catch (err) {
// 		console.error("Unhandled error in event route:", err);
// 		return NextResponse.json(
// 			errorResponse("INTERNAL_ERROR", "Internal server error"),
// 			{ status: 500 }
// 		);
// 	}
// }

export async function POST(req: Request) {
	try {
		console.log("made it to gift post");
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				errorResponse("UNAUTHORIZED", "Unauthorized"),
				{ status: 401 }
			);
		}
		const userId = session.user.id;

		// (alias) interface CreateGiftRequestPost {
		//     name: string;
		//     link?: string | undefined;
		//     eventId: number;
		//     participantId: string;
		//     addedByUserId: string;
		// }

		const {
			name,
			link = null, //this might be a problem if formik passes an empty string
			eventId,
			participantId,
			addedByUserId,
		}: CreateGiftRequestPost = await req.json();

		if (!name || !eventId || !participantId || !addedByUserId) {
			return NextResponse.json(
				errorResponse(
					"BAD_REQUEST",
					"Missing name, event id, participant id, or added by user id"
				),
				{ status: 400 }
			);
		}

		// const event = await prisma.$transaction(async (tx) => {
		const newGift = await prisma.gift.create({
			data: {
				name,
				link,
				eventId,
				recipientUserId: participantId,
				addedByUserId,
				reservedByUserId: null,
			},
		});

		// await tx.eventParticipant.create({
		// 	data: {
		// 		userId,
		// 		eventId: event.id,
		// 		isShopper: false,
		// 		isRecipient: false,
		// 	},
		// });

		// const fullEvent = await tx.event.findUnique({
		// 	where: { id: event.id },
		// 	select: {
		// 		id: true,
		// 		name: true,
		// 		date: true,
		// 		description: true,
		// 		ownerId: true,
		// 		createdAt: true,
		// 	},
		// });

		// return fullEvent;
		// });

		if (!newGift) {
			return NextResponse.json(
				errorResponse("NOT_FOUND", "Gift could not be created"),
				{ status: 500 }
			);
		}
		console.log("gift added successfully", newGift);
		return NextResponse.json(
			successResponse(newGift, "Gift added successfully"),
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error inserting gift:", err);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
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
