import { NextResponse } from "next/server";

let inc = 3;
let items = [
	{
		id: 1,
		name: "Harley the Donkey's Birthday",
		date: "5-25-2025",
		description: "A celebration of another year for Harley!",
	},
	{
		id: 2,
		name: "Christmas 2025",
		date: "12-25-2025",
		description: "Everyone getting together for Christmas!",
	},
];

export async function GET() {
	return NextResponse.json(items, { status: 200 });
}

export async function POST(req: Request) {
	const body = await req.json();
	items.push({ ...body, id: inc });
	return NextResponse.json(
		{ message: "Event created", event: { ...body, id: inc++ } },
		{ status: 201 }
	);
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

// import type { NextApiRequest, NextApiResponse } from "next";

// let items = [
// 	{
// 		id: 1,
// 		name: "Harley the Donkey's Birthday",
// 		date: "5-25-2025",
// 		description: "A celebration of another year for Harley!",
// 	},
// 	{
// 		id: 2,
// 		name: "Christmas 2025",
// 		date: "12-25-2025",
// 		description: "Everyone getting together for Christmas!",
// 	},
// ];

// let inc = 3;
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	switch (req.method) {
// 		case "GET":
// 			res.status(200).json(items);
// 			break;
// 		case "POST":
// 			items.push({ ...req.body, id: inc });
// 			console.log("from api", { ...req.body, id: inc });
// 			res.status(200).json({ ...req.body, id: inc++ });
// 			// I will need to post this to the database and also somehow return the primary key for the event's id for the event object I'm returning here
// 			break;
// default:
// 	res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
// 	res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }
