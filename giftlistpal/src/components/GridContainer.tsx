import React from "react";
import Link from "next/link";

type Variant = "participant" | "gift-event";
type GridContainerProps = {
	title: String;
	description: String;
	variant: Variant;
	children?: React.ReactNode;
	eventId?: number;
};

function GridContainer({
	children,
	title,
	description,
	variant,
	eventId,
}: GridContainerProps) {
	const linkUrl =
		variant === "participant"
			? `/events/${eventId}/participants/invite`
			: `/events/new`;
	const buttonTitle = variant === "participant" ? "Add Person" : "Add Event";

	return (
		<>
			<div className="mb-12">
				<h1 className="mb-4 font-bold text-4xl">{title}</h1>
				<h3 className="text-lg">{description}</h3>
			</div>
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
			{children}
		</>
	);
}

export default GridContainer;
