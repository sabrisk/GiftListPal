import React from "react";
import Link from "next/link";
import { Gift, patchGiftRequest } from "@/types/gift";
import { current } from "@reduxjs/toolkit";

interface GiftItemProps {
	gift: Gift;
	handleGiftClick: (
		updatedGift: patchGiftRequest,
		currReservedByUserId: string | null
	) => void;
	currentUserId: string | null;
}

function GiftItem({ gift, handleGiftClick, currentUserId }: GiftItemProps) {
	return (
		<Link
			className="block h-full"
			href={gift.link ? gift.link : "#"}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div
				className="flex flex-col
							h-full
							justify-between
							group
							rounded
							cursor-pointer
							text-2xl
							bg-[var(--surface)] 
							border
							border-[var(--surface-border)]
							hover:border-[var(--primary)] hover:opacity-60"
				style={{
					pointerEvents:
						gift.reservedByUserId !== null &&
						gift.reservedByUserId !== currentUserId &&
						gift.recipientUserId !== currentUserId
							? "none"
							: "auto",
					opacity:
						gift.reservedByUserId !== null &&
						gift.reservedByUserId !== currentUserId &&
						gift.recipientUserId !== currentUserId
							? 0.6
							: 1,
				}}
			>
				<div className="flex flex-row justify-start items-center my-3">
					{gift.recipientUserId !== currentUserId && (
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleGiftClick(
									{
										id: gift.id,
										reservedByUserId:
											gift.reservedByUserId ===
											currentUserId
												? null
												: currentUserId,
									},
									gift.reservedByUserId
								);
							}}
							className="text-3xl pl-0.5 rounded my-auto mx-3 bg-[var(--background)] border border-[var(--surface-border)] hover:border-[var(--primary)] aspect-square w-13 h-13 flex justify-center items-center"
						>
							{gift.reservedByUserId === currentUserId
								? "🎁"
								: gift.reservedByUserId === null
								? ""
								: "🔒"}
						</button>
					)}
					<div
						className="mx-5
								flex
								justify-start
								hover:underline"
					>
						{gift.name}
					</div>
				</div>

				{gift.recipientUserId !== currentUserId && (
					<div className="flex flex-row justify-start">
						<span className="text-lg ml-3 mt-auto  mb-2 rounded-2xl px-3 bg-[var(--background)]">
							{gift.addedByUserId === gift.recipientUserId
								? "⭐ Wishlist"
								: `👍 Recommended`}
						</span>
						<span className="text-lg ml-3 mr-3 mt-auto  mb-2 rounded-2xl px-3 bg-[var(--background)]">
							{gift.reservedByUserId === currentUserId
								? "Reserved"
								: gift.reservedByUserId === null
								? "Available"
								: "Taken"}
						</span>
					</div>
				)}
			</div>
		</Link>
	);
}

export default GiftItem;
