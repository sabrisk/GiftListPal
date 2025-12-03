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

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				errorResponse("UNAUTHORIZED", "Unauthorized"),
				{ status: 401 }
			);
		}

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

		if (!newGift) {
			return NextResponse.json(
				errorResponse("NOT_FOUND", "Gift could not be created"),
				{ status: 500 }
			);
		}
		return NextResponse.json(
			successResponse(newGift, "Gift added successfully"),
			{ status: 201 }
		);
	} catch (err) {
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
