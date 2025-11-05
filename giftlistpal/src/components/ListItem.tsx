import React from "react";
import Link from "next/link";
import { Event } from "@/types/event";
import { Participant } from "@/types/participant";

type ListItemProps =
	| ({
			variant: "gift-event";
	  } & Event)
	| ({
			variant: "participant";
	  } & Participant);

function ListItem(props: ListItemProps) {
	const linkUrl =
		props.variant === "gift-event"
			? `/events/${props.id}/participants`
			: `/events/${props.event.id}/participants/${props.user.id}`;

	const name = props.variant === "gift-event" ? props.name : props.user.name;

	return (
		<Link href={linkUrl}>
			<div
				className="flex flex-col
							justify-start
							group
							rounded
							cursor-pointer
							text-2xl
							bg-[var(--surface)] 
							border
							border-[var(--surface-border)]
							hover:border-[var(--primary)]"
			>
				<div
					className="p-5
								flex
								flex-1
								flex-col
								justify-center
								md:border-[#3d3d3d]"
				>
					{name}
				</div>
			</div>
		</Link>
	);
}

export default ListItem;
