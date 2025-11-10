import React from "react";
import Item from "@/components/Item";
import { Event } from "@/types/event";
import { Participant } from "@/types/participant";

type ItemGridProps =
	| { variant: "gift-event"; items: Event[] }
	| { variant: "participant"; items: Participant[] };

function ItemGrid({ variant, items }: ItemGridProps) {
	return (
		<main className="grid gap-4 my-4 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => {
				if (variant === "gift-event") {
					const event = item as Event;
					const key = `event-${event.id}`;
					return <Item key={key} {...event} variant="gift-event" />;
				} else {
					const participant = item as Participant;
					const key = `participant-${participant.user.id}-${participant.event.id}`;
					return (
						<Item
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

export default ItemGrid;
