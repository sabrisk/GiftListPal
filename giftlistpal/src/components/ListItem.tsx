import React from "react";
import Link from "next/link";

type ListItemProps = {
	id: number;
	name: string;
	variant: string;
	eventId?: number;
};

function ListItem({ id, name, variant, eventId }: ListItemProps) {
	const linkUrl =
		variant === "gift-event"
			? `/events/${id}/participants`
			: `/events/${eventId}/participants/${id}`;
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
