import type { NextApiRequest, NextApiResponse } from "next";

// Fake in-memory database
import people from "../../../../../fakeDb.js";
// const people = [
// 	{ event_id: 1, name: "Robert" },
// 	{ event_id: 1, name: "Pamela" },
// 	{ event_id: 1, name: "Javi" },
// 	{ event_id: 1, name: "Harley" },
// 	{ event_id: 2, name: "Mom" },
// 	{ event_id: 2, name: "Dad" },
// 	{ event_id: 2, name: "Jared" },
// 	{ event_id: 2, name: "Jaimee" },
// ];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			const { id } = req.query;

			if (typeof id !== "string") {
				res.status(400).json({ error: "Invalid event id" });
				return;
			}
			const eventId = parseInt(id);
			console.log(eventId);
			console.log(people);
			const eventParticipants = people.filter(
				(person) => person.event_id === eventId
			);
			res.status(200).json(eventParticipants);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
