"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";

import GridContainer from "@/components/GridContainer";
import React, { useEffect } from "react";
import ListGrid from "@/components/ListGrid";
import {
	getGiftEvents,
	selectAllGiftEvents,
	selectGiftEventsStatus,
} from "@/features/GiftEvents/giftEventsSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Events() {
	useEffect(() => {
		document.title = `Events | GiftListPal`;
	}, []);
	const { data: session, status } = useSession();
	const router = useRouter();
	const userId = session?.user?.id;
	const dispatch = useAppDispatch();
	const giftEvents = useAppSelector(selectAllGiftEvents);
	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.replace("/signup"); // redirect to login/signup page
		}
	}, [status, router]);

	useEffect(() => {
		//userId to ensure user logged in
		if (giftEventsStatus === "idle" && userId) {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, userId, dispatch]);

	return (
		<main>
			<GridContainer // title={"Participants"}
				title={"Events"}
				description={"Select or add events below"}
				variant={"gift-event"}
			>
				<ListGrid variant={"gift-event"} items={giftEvents} />
			</GridContainer>

			<button
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
				<Link href={`/events/new`}>+</Link>
			</button>
		</main>
	);
}

export default Events;
