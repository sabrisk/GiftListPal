import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

interface EventRequestBody {
	name: string;
	date: string;
	ownerId: number;
	description?: string;
}

export async function GET() {
	try {
		const result = await query("SELECT * FROM events");
		const events = result.rows.map(
			({
				id,
				event_name,
				event_date,
				owner_id,
				event_description,
				created_at,
			}) => {
				return {
					id: id,
					name: event_name,
					date: event_date,
					description: event_description,
					createdAt: created_at,
				};
			}
		);
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
		const result = await query(
			`INSERT INTO events (event_name, event_date, owner_id, event_description)
			VALUES ($1, $2, $3, $4)
			RETURNING *;`,
			[name, date, ownerId, description ?? null]
		);
		const row = result.rows[0];
		const event = {
			id: row.id,
			name: row.event_name,
			date: row.event_date,
			description: row.event_description,
			createdAt: row.created_at,
		};
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
