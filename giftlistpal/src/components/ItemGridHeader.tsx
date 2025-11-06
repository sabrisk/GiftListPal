import React from "react";
// import Link from "next/link";

type ItemGridHeaderProps = {
	title: String;
	description: String;
	children?: React.ReactNode;
};

function ItemGridHeader({ title, description }: ItemGridHeaderProps) {
	return (
		<div className="mb-12">
			<h1 className="mb-4 font-bold text-4xl">{title}</h1>
			<h3 className="text-lg">{description}</h3>
		</div>
	);
}

export default ItemGridHeader;
