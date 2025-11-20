import React from "react";
import Link from "next/link";
import { Gift } from "@/types/gift";

function GiftItem(props: Gift) {
	// const linkUrl =
	// 	props.variant === "gift-event"
	// 		? `/events/${props.id}/participants`
	// 		: `/events/${props.event.id}/participants/${props.user.id}`;

	return (
		<Link href={props.link}>
			<div
				className="flex flex-row
							justify-between
							group
							rounded
							cursor-pointer
							text-2xl
							bg-[var(--surface)] 
							border
							border-[var(--surface-border)]
							hover:border-[var(--primary)]"
			>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					className="text-3xl pl-0.5 rounded my-auto mx-3 bg-[var(--background)] border border-[var(--surface-border)] hover:border-[var(--primary)] aspect-square w-13 h-13 flex justify-center items-center"
				>
					🎁
				</button>
				<div
					className="p-5
								flex
								flex-1
								flex-col
								justify-center
								md:border-[#3d3d3d]"
				>
					{props.name}
				</div>
			</div>
		</Link>
	);
}

export default GiftItem;
