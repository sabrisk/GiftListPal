"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";

import ItemGridHeader from "@/components/ItemGridHeader";
import React, { useEffect } from "react";
import ItemGrid from "@/components/ItemGrid";
import AddItemLink from "@/components/AddItemLink";
import AddItemLinkMobile from "@/components/AddItemLinkMobile";
import {
	getGiftEvents,
	selectAllGiftEvents,
	selectGiftEventsStatus,
} from "@/features/GiftEvents/giftEventsSlice";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { selectUser } from "@/features/User/userSlice";

function Events() {
	useEffect(() => {
		document.title = `Events | GiftListPal`;
	}, []);
	const { data: session, status } = useSession();
	const router = useRouter();
	const userId = session?.user?.id;
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUser);
	const giftEvents = useAppSelector(selectAllGiftEvents);
	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);

	useEffect(() => {
		//userId to ensure user logged in
		if (giftEventsStatus === "idle" && userId) {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, userId, dispatch]);

	return (
		<AuthGuard>
			<main>
				<ItemGridHeader
					title={"Events"}
					description={"Select or add events below"}
				></ItemGridHeader>
				<AddItemLink variant={"gift-event"} />
				<ItemGrid variant={"gift-event"} items={giftEvents} />

				<AddItemLinkMobile variant={"gift-event"} />
			</main>
		</AuthGuard>
	);
}

export default Events;
