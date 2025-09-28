import type { NextApiRequest, NextApiResponse } from "next";

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
	// {
	// 	id: ,
	// 	name: "Thanksgiving 2025",
	// 	date: "12-25-2025",
	// 	description: "Whole family getting together for Christmas",
	// },
	// {
	// 	id: ,
	// 	name: "Christmas 2025",
	// 	date: "12-25-2025",
	// 	description: "Whole family getting together for Christmas along",
	// },
	// {
	// 	id: ,
	// 	name: "Rockclimbing at recreational",
	// 	date: "5-25-2025",
	// 	description: "A fun get together with Grandmother at her place in",
	// },
	// {
	// 	id: ,
	// 	name: "Christmas 2025",
	// 	date: "12-25-2025",
	// 	description: "Whole family getting together for Christmas along",
	// },
	// {
	// 	id: ,
	// 	name: "Christmas 2025",
	// 	date: "12-25-2025",
	// 	description: "Whole family getting together for Christmas along",
	// },
];

let inc = 3;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			res.status(200).json(items);
			break;
		case "POST":
			items.push({ ...req.body, id: inc });
			console.log("from api", { ...req.body, id: inc++ });
			items.push;
			res.status(200).json({ ...req.body, id: inc++ });
			// I will need to post this to the database and also somehow return the primary key for the event's id for the event object I'm returning here
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
