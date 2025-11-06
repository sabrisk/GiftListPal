import Link from "next/link";
import React from "react";

type Variant = "participant" | "gift-event";

interface AddItemLinkProps {
	variant: Variant;
	eventId?: number;
}

const AddItemLink = ({ variant, eventId }: AddItemLinkProps) => {
	const linkUrl =
		variant === "participant"
			? `/events/${eventId}/participants/invite`
			: `/events/new`;
	const buttonTitle = variant === "participant" ? "Add Person" : "Add Event";

	return (
		<Link
			href={linkUrl}
			className="hidden
                            sm:inline-block
                            rounded
                            px-2
                            py-1
                            font-bold
                            text-center
                            bg-[var(--primary)]
                            hover:bg-[var(--primary-hover)]
                            text-[var(--primary-text)]"
		>
			{buttonTitle}
		</Link>
	);
};

export default AddItemLink;
