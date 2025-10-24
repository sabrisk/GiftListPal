import React from "react";
import Link from "next/link";

type ListItemProps = {
	id: number;
	name: string;
};

function ListItem({ id, name }: ListItemProps) {
	return (
		<Link href={`/events/${id}/participants`}>
			<div className="flex flex-col justify-start group cursor-pointer text-2xl bg-gray-700 rounded border hover:border-[#F5EFE7] border-slate-600">
				<div className="p-5 flex justify-center flex-col flex-1 md:border-[#3d3d3d]">
					{name}
				</div>
			</div>
		</Link>
	);
}

export default ListItem;
