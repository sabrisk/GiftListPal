"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

import ItemGridHeader from "@/components/ItemGridHeader";
import GiftList from "@/components/GiftList";
import AddItemLink from "@/components/AddItemLink";
import AddItemLinkMobile from "@/components/AddItemLinkMobile";

import {
	getParticipantGifts,
	selectParticipantGifts,
	selectParticipantGiftsStatus,
	resetParticipantGifts,
} from "@/features/Gifts/giftsSlice";

function Gifts() {
	const dispatch = useAppDispatch();
	const { data: session } = useSession();
	const currUser = session?.user?.id;
	const params = useParams();

	const eventId = params?.eid ? Number(params.eid) : undefined;

	const rawUserId = params?.uid;
	const userId = typeof rawUserId === "string" ? rawUserId : undefined;

	const participantGifts = useAppSelector(selectParticipantGifts);
	const participantGiftsStatus = useAppSelector(selectParticipantGiftsStatus);

	useEffect(() => {
		document.title = `Gifts | GiftListPal`;
	}, []);

	useEffect(() => {
		if (
			participantGiftsStatus === "idle" &&
			typeof eventId === "number" &&
			typeof userId === "string"
		) {
			dispatch(getParticipantGifts({ eventId, userId }));
		}
	}, [participantGiftsStatus, eventId, userId, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(resetParticipantGifts());
		};
	}, [dispatch]);

	// useEffect(() => {
	// 	if (
	// 		currUser &&
	// 		typeof eventId === "number" &&
	// 		typeof userId === "string"
	// 	) {
	// 		dispatch(resetParticipantGifts()); // clear previous gifts
	// 		dispatch(getParticipantGifts({ eventId, userId })); // fetch new ones
	// 	}
	// }, [currUser, eventId, userId, dispatch]);

	if (!eventId) {
		return <div>No event id found.</div>;
	}
	if (!currUser) {
		return <div>No user id found.</div>;
	}
	if (!userId) {
		return <div>No gift user id found.</div>;
	}

	return (
		<AuthGuard>
			{participantGiftsStatus === "succeeded" && participantGifts && (
				<main>
					<ItemGridHeader
						title={"Events"}
						description={"Select or add events below"}
					></ItemGridHeader>
					<AddItemLink
						variant={"gift"}
						userId={userId}
						eventId={eventId}
					/>
					<GiftList gifts={participantGifts} />

					<AddItemLinkMobile
						variant={"gift"}
						userId={userId}
						eventId={eventId}
					/>
				</main>
			)}
		</AuthGuard>
	);
}

export default Gifts;
