import React from "react";
import GiftItem from "@/components/GiftItem";
import { Gift, patchGiftRequest } from "@/types/gift";

type GiftListProps = {
	gifts: Gift[];
	handleGiftClick: (
		updatedGift: patchGiftRequest,
		currReservedByUserId: string | null
	) => void;
	currentUserId: string | null;
};

function GiftList({ gifts, handleGiftClick, currentUserId }: GiftListProps) {
	return (
		<main className="grid gap-4 my-4 max-w-6xl mx-auto md:grid-cols-2">
			{gifts.map((currGift) => {
				const gift = currGift as Gift;
				const key = gift.id;
				return (
					<GiftItem
						key={key}
						gift={gift}
						handleGiftClick={handleGiftClick}
						currentUserId={currentUserId}
					/>
				);
			})}
		</main>
	);
}

export default GiftList;
