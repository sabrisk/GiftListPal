"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";

import ItemGridHeader from "@/components/ItemGridHeader";
import React, { useEffect } from "react";
import ListGrid from "@/components/ListGrid";
import AddItemLink from "@/components/AddItemLink";
import AddItemLinkMobile from "@/components/AddItemLinkMobile";
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
			<>
				<ItemGridHeader
					title={"Events"}
					description={"Select or add events below"}
				></ItemGridHeader>
				<AddItemLink variant={"gift-event"} />
				<ListGrid variant={"gift-event"} items={giftEvents} />
			</>

			<AddItemLinkMobile variant={"gift-event"} />
		</main>
	);
}

export default Events;
