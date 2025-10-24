import React from "react";
import ListItem from "@/components/ListItem";
import { GiftEvent } from "@/types";

type Participant = {
	id: number;
	name: string;
};

type ListGridProps = {
	items: Array<Participant | GiftEvent>;
};

function ListGrid({ items }: ListGridProps) {
	return (
		<main className="grid gap-4 py-4 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3">
			{items.map((item) => (
				<ListItem key={item.id} {...item} />
			))}
		</main>
	);
}

export default ListGrid;
