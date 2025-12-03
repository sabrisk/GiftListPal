import Link from "next/link";
import React from "react";
import { getButtonTitle, getLink } from "@lib/utility";

type Variant = "participant" | "gift-event" | "gift";

interface AddItemLinkProps {
	variant: Variant;
	eventId?: number;
	userId?: string;
}

const AddItemLink = ({ variant, eventId, userId }: AddItemLinkProps) => {
	const linkUrl = getLink(variant, eventId, userId);
	const buttonTitle = getButtonTitle(variant);

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
