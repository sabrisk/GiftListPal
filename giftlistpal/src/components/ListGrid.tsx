import React from "react";
import ListItem from "@/components/ListItem";
import { Event } from "@/types/event";
import { Participant } from "@/types/participant";

type ListGridProps =
	| { variant: "gift-event"; items: Event[] }
	| { variant: "participant"; items: Participant[] };

function ListGrid({ variant, items }: ListGridProps) {
	return (
		<main className="grid gap-4 my-4 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => {
				if (variant === "gift-event") {
					const event = item as Event;
					const key = `event-${event.id}`;
					return (
						<ListItem key={key} {...event} variant="gift-event" />
					);
				} else {
					const participant = item as Participant;
					const key = `participant-${participant.user.id}-${participant.event.id}`;
					return (
						<ListItem
							key={key}
							{...participant}
							variant="participant"
						/>
					);
				}
			})}
		</main>
	);
}

export default ListGrid;
