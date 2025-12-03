import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../../auth";
import { SuccessResponse, ErrorResponse } from "@/types/participant";
import { participantSelect } from "@lib/prismaSelects";

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

export async function GET(_request: Request, context: any) {
	const { eid } = context.params;
	const eventId = eid ? Number(eid) : undefined;
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json(
			errorResponse("UNAUTHORIZED", "Unauthorized"),
			{ status: 401 }
		);
	}

	try {
		console.log("Fetching participants for event:", eventId);

		const participants = await prisma.eventParticipant.findMany({
			where: {
				eventId,
			},
			select: participantSelect,
		});

		return NextResponse.json(
			successResponse(
				participants,
				"Participants retreived successfully"
			),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Unhandled error in participants route:", error);
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
