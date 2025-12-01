import React from "react";
import Link from "next/link";

interface CrumbData {
	id: number | string;
	name: string;
}

type ItemGridHeaderProps = {
	eventData?: CrumbData;
	participantData?: CrumbData;
	description: String;
	children?: React.ReactNode;
};

function ItemGridHeader({
	eventData,
	participantData,
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
	// debugger;
	// if (!eventData && !participantData) {
	breadcrumbs.push({
		link: `/events`,
		name: "Events",
	});
	// }
	if (eventData) {
		breadcrumbs.push({
			link: `/events/${eventData.id}/participants`,
			name: eventData.name,
		});
	}

	if (eventData && participantData) {
		breadcrumbs.push({
			link: `/events/${eventData.id}/participants/${participantData.id}/gifts`,
			name: participantData.name,
		});
	}
	return (
		<div className="mb-12">
			{breadcrumbs.map((data, index) => {
				// debugger;
				return (
					<div key={index} className="inline-block mb-2">
						{index !== 0 && (
							<span className="text-2xl px-6">❯</span>
						)}
						{breadcrumbs.length !== index + 1 && (
							<Link href={data.link}>
								<span className="text-2xl underline hover:text-[var(--primary-hover)]">
									{data?.name}
								</span>
							</Link>
						)}
						{/* Don't attach a link to current page */}
						{breadcrumbs.length === index + 1 && (
							<span className="text-2xl semi-bold">
								{data?.name}
							</span>
						)}
					</div>
				);
			})}
			<div className="flex mt-5">
				<h3 className="font-bold text-3xl inline ">{description}</h3>
			</div>
		</div>
	);
}

export default ItemGridHeader;
