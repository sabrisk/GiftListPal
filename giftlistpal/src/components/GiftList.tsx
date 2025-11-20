import React from "react";
import GiftItem from "@/components/GiftItem";
import { Gift } from "@/types/gift";

type GiftListProps = { gifts: Gift[] };

function GiftList({ gifts }: GiftListProps) {
	return (
		<main className="grid gap-4 my-4 max-w-6xl mx-auto md:grid-cols-2">
			{gifts.map((currGift) => {
				const gift = currGift as Gift;
				const key = gift.id;
				return <GiftItem key={key} {...gift} />;
			})}
		</main>
	);
}

export default GiftList;
