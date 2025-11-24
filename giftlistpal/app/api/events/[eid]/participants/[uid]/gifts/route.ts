import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../../../../auth";

import {
	// CreateEventRequest,
	SuccessResponse,
	ErrorResponse,
	patchGiftRequest,
} from "@/types/gift";
import { giftSelect } from "@lib/prismaSelects";

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

export async function GET(
	request: Request,
	{ params }: { params: { eid: string; uid: string } }
) {
	try {
		const { eid, uid } = await params;
		console.log("GET /api/events/${eventId}/participants/${userId} called");
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json(
				errorResponse("UNAUTHORIZED", "Unauthorized"),
				{ status: 401 }
			);
		}

		console.log("Fetching gifts for participant:", eid, uid);
		const gifts = await prisma.gift.findMany({
			where: {
				eventId: parseInt(eid),
				recipientUserId: uid,
			},
			select: giftSelect,
			orderBy: {
				reservedByUserId: "desc", // or "asc"
			},
		});
		return NextResponse.json(
			successResponse(gifts, "Gifts retreived successfully"),
			{
				status: 200,
				headers: {
					"Cache-Control": "no-store",
				},
			}
		);
	} catch (err) {
		console.error("Unhandled error in event route:", err);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
			{ status: 500 }
		);
	}
}

export async function PATCH(request: Request) {
	try {
		const {
			id,
			name,
			link,
			eventId,
			participantId,
			addedByUserId,
			reservedByUserId,
		}: patchGiftRequest = await request.json();

		if (!id) {
			return NextResponse.json(
				errorResponse("BAD_REQUEST", "Missing gift id"),
				{ status: 400 }
			);
		}

		// Build a data object with only defined fields
		const data: Record<string, any> = {};
		if (name !== undefined) data.name = name;
		if (link !== undefined) data.link = link;
		if (eventId !== undefined) data.eventId = eventId;
		if (participantId !== undefined) data.recipientUserId = participantId;
		if (addedByUserId !== undefined) data.addedByUserId = addedByUserId;
		if (reservedByUserId !== undefined)
			data.reservedByUserId = reservedByUserId;

		console.log("just prior to update the gift", data);
		// Update the gift
		const updatedGift = await prisma.gift.update({
			///this needs to be a transaction where you get the gift to see if it already has the reservedByUserId set by a different user first
			where: { id },
			data,
			select: giftSelect, // whatever fields you want returned
		});

		return NextResponse.json(
			successResponse(updatedGift, "Gift updated successfully"),
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error updating gift:", err);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
			{ status: 500 }
		);
	}
}

// export async function POST(req: Request) {
// 	try {
// 		const session = await auth();
// 		if (!session?.user?.id) {
// 			return NextResponse.json(
// 				errorResponse("UNAUTHORIZED", "Unauthorized"),
// 				{ status: 401 }
// 			);
// 		}
// 		const userId = session.user.id;

// 		const { name, date, description }: CreateEventRequest =
// 			await req.json();

// 		if (!name || !date || !description) {
// 			return NextResponse.json(
// 				errorResponse(
// 					"BAD_REQUEST",
// 					"Missing name, date, or description"
// 				),
// 				{ status: 400 }
// 			);
// 		}

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
// 				},
// 			});

// 			return fullEvent;
// 		});

// 		if (!event) {
// 			return NextResponse.json(
// 				errorResponse("NOT_FOUND", "Event could not be created"),
// 				{ status: 500 }
// 			);
// 		}

// 		return NextResponse.json(
// 			successResponse(event, "Event added successfully"),
// 			{ status: 201 }
// 		);
// 	} catch (err) {
// 		console.error("Error inserting event:", err);
// 		return NextResponse.json(
// 			errorResponse("INTERNAL_ERROR", "Internal server error"),
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
