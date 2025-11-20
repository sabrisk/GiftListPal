import { getLink } from "@lib/utility";
import Link from "next/link";
import React from "react";

type Variant = "participant" | "gift-event" | "gift";

interface AddItemLinkMobileProps {
	variant: Variant;
	eventId?: number;
	userId?: string;
}

const AddItemLinkMobile = ({
	variant,
	eventId,
	userId,
}: AddItemLinkMobileProps) => {
	const linkUrl = getLink(variant, eventId, userId);
	return (
		<Link
			href={linkUrl}
			className="flex
							fixed
							bottom-7
							right-7
							w-16
							h-16
							rounded-full
							items-center
							justify-center
							text-4xl
							bg-[var(--primary)]
							hover:bg-[var(--primary-hover)]
							text-[var(--primary-text)]
							sm:hidden"
			aria-label="Add	Event"
		>
			+
		</Link>
	);
};

export default AddItemLinkMobile;
