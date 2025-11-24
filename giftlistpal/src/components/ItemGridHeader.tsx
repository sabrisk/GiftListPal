import React from "react";
// import Link from "next/link";

type ItemGridHeaderProps = {
	eventName?: String;
	participantName?: String;
	description: String;
	children?: React.ReactNode;
};

function ItemGridHeader({
	eventName,
	participantName,
	description,
}: ItemGridHeaderProps) {
	let title = "";
	// if (eventName && participantName) {
	// 	title = `${eventName}  ❯  ${participantName}`;
	// }

	// if (!participantName) {
	// 	title = eventName;
	// }
	// debugger;
	let breadcrumbs = [];

	if (!eventName && !participantName) {
		breadcrumbs.push("Events");
	}
	if (eventName) {
		breadcrumbs.push(eventName);
	}

	if (participantName) {
		breadcrumbs.push(participantName);
	}
	return (
		<div className="mb-12">
			{breadcrumbs.map((crumb, index) => (
				<div key={index} className="inline-block mb-2">
					<span className="font-bold text-4xl">{crumb}</span>
					{index === 0 && breadcrumbs.length > 1 && (
						<span className="text-4xl px-6">❯</span>
					)}
				</div>
			))}
			<div className="flex mt-5">
				<h3 className="text-xl inline ">{description}</h3>
			</div>
		</div>
	);
}

export default ItemGridHeader;
