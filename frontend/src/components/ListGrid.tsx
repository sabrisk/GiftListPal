import React from "react";
import ListItem from "../components/ListItem";
import { v4 as uuid } from "uuid";
import { GiftEvent } from "@/types";

type Person = {
	id: number;
	name: string;
};

type ListGridProps = {
	items: Array<Person | GiftEvent>;
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
