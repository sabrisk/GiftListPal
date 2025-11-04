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
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		console.log("Fetching participants for event:", session.user.id);

		const participants = await prisma.eventParticipant.findMany({
			where: {
				eventId,
			},
			select: participantSelect,
		});

		return NextResponse.json(participants, { status: 200 });
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
