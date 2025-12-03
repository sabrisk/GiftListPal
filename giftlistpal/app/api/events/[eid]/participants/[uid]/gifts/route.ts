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
	_request: Request,
	{ params }: { params: { eid: string; uid: string } }
) {
	try {
		const { eid, uid } = params;
		const session = await auth();

		if (!session?.user?.id) {
			return NextResponse.json(
				errorResponse("UNAUTHORIZED", "Unauthorized"),
				{ status: 401 }
			);
		}

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
		//Need to update patchGiftRequest type use recipientUserId instead of participantId
		//So I can use that instead of an unknown type
		const data: Record<string, unknown> = {}; // loose typing for DB

		if (name !== undefined) data.name = name;
		if (link !== undefined) data.link = link;
		if (eventId !== undefined) data.eventId = eventId;
		if (participantId !== undefined) data.recipientUserId = participantId;
		if (addedByUserId !== undefined) data.addedByUserId = addedByUserId;
		if (reservedByUserId !== undefined)
			data.reservedByUserId = reservedByUserId;

		// // Build a data object with only defined fields
		// // const data: Record<string, any> = {};
		// if (name !== undefined) data.name = name;
		// if (link !== undefined) data.link = link;
		// if (eventId !== undefined) data.eventId = eventId;
		// if (participantId !== undefined) data.recipientUserId = participantId;
		// if (addedByUserId !== undefined) data.addedByUserId = addedByUserId;
		// if (reservedByUserId !== undefined)
		// 	data.reservedByUserId = reservedByUserId;

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

export async function OPTIONS() {
	return NextResponse.json(
		{ error: "Method Not Allowed" },
		{
			status: 405,
			headers: { Allow: "GET, POST" },
		}
	);
}
