import React from "react";
import ListItem from "@/components/ListItem";
// import { GiftEvent } from "@/types";

type Participant = {
	id: number;
	name: string;
};

export interface GiftEvent {
	id: number;
	name: string;
	date?: string;
	description?: string;
}

type Variant = "participant" | "gift-event";

type ListGridProps = {
	variant: Variant;
	items: Array<Participant | GiftEvent>;
	eventId?: number;
};

function ListGrid({ items, variant, eventId }: ListGridProps) {
	console.log({ items: { items } });
	console.log({ eventid: { eventId } });

	return (
		<main className="grid gap-4 py-4 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => (
				<ListItem
					key={item.id}
					{...item}
					variant={variant}
					eventId={eventId}
				/>
			))}
		</main>
	);
}

export default ListGrid;
