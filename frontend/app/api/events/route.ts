import { NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { prisma } from "../../../lib/prisma";

interface EventRequestBody {
	name: string;
	date: string;
	ownerId: string;
	description?: string;
}

export async function GET() {
	try {
		const events = await prisma.event.findMany({
			select: {
				id: true,
				name: true,
				date: true,
				ownerId: true,
				description: true,
				createdAt: true,
			},
		});

		return NextResponse.json(events, { status: 200 });
	} catch (err) {
		console.error("Error getting event:", err);
		return NextResponse.json(
			{ error: "Database get failed" },
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const { name, date, ownerId, description }: EventRequestBody =
			await req.json();

		const event = await prisma.event.create({
			data: {
				name,
				date: new Date(date),
				ownerId,
				description,
			},
			select: {
				id: true,
				name: true,
				date: true,
				ownerId: true,
				description: true,
				createdAt: true,
			},
		});
		console.log("newEvent:", event);

		return NextResponse.json(event, { status: 201 });
	} catch (err) {
		console.error("Error inserting event:", err);
		return NextResponse.json(
			{ error: "Database insert failed" },
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
