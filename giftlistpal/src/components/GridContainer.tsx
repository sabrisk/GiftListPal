import React from "react";
import Link from "next/link";

type Variant = "participant" | "gift-event";
type GridContainerProps = {
	title: String;
	description: String;
	variant: Variant;
	children?: React.ReactNode;
};

function GridContainer({
	children,
	title,
	description,
	variant,
}: GridContainerProps) {
	return (
		<>
			<div className=" mb-12">
				<h1 className="mb-4 font-bold text-4xl">{title}</h1>
				<h3 className="text-lg">{description}</h3>
			</div>
			<button className="hidden md:block bg-[#F5EFE7] text-[#313131] font-bold border-1 rounded border-[#F5EFE7] px-2 ">
				{variant === "participant" ? (
					"Add Person"
				) : (
					<Link href={`/events/new`}>Add Event</Link>
				)}
			</button>
			{children}
		</>
	);
}

export default GridContainer;
