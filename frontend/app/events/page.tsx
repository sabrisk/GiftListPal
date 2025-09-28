"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import GridContainer from "@/components/GridContainer";
import React, { useEffect } from "react";
import ListGrid from "../../src/components/ListGrid";
import {
	getGiftEvents,
	selectAllGiftEvents,
	selectGiftEventsStatus,
} from "@/features/GiftEvents/GiftEventsSlice";
import Link from "next/link";

function Events() {
	const dispatch = useAppDispatch();
	const giftEvents = useAppSelector(selectAllGiftEvents);
	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	useEffect(() => {
		if (giftEventsStatus === "idle") {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, dispatch]);

	const anEvent = {
		name: "Christmas 2025",
		date: "12-25-2025",
		description: "Whole family getting together for Christmas along",
	};

	return (
		<main className="p-6">
			<GridContainer // title={"People"}
				title={"Events"}
				description={"Select or add event below"}
				variant={"gift-event"}
			>
				<ListGrid items={giftEvents} />
			</GridContainer>

			<button
				className="md:hidden fixed bottom-7 right-7 w-16 h-16 bg-gray-600 text-white text-4xl border border-slate-600 rounded-full flex items-center justify-center  hover:bg-gray-500 transition-colors"
				aria-label="Add Event"
			>
				<Link href={`/events/new`}>+</Link>
			</button>
		</main>
	);
}

export default Events;
