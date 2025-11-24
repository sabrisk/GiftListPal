"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

import ItemGridHeader from "@/components/ItemGridHeader";
import GiftList from "@/components/GiftList";
import AddItemLink from "@/components/AddItemLink";
import AddItemLinkMobile from "@/components/AddItemLinkMobile";

import {
	getGiftEvents,
	selectGiftEventById,
	selectGiftEventsStatus,
} from "@/features/GiftEvents/giftEventsSlice";

import {
	getParticipants,
	selectParticipantsStatus,
} from "@/features/Participants/participantsSlice";

import {
	getParticipantGifts,
	selectParticipantGifts,
	selectParticipantGiftsStatus,
	resetParticipantGifts,
	updateParticipantGift,
	updateParticipantGiftStatus,
} from "@/features/Gifts/giftsSlice";

import { selectParticipantById } from "@/features/Participants/participantsSlice";

import { patchGiftRequest } from "@/types/gift";

function Gifts() {
	const dispatch = useAppDispatch();
	const { data: session } = useSession();
	const currUser = session?.user?.id ?? null;
	// const pathname = usePathname();
	// const title = pathname.endsWith("/gifts");
	const params = useParams();
	const rawUserId = params?.uid;
	const userId = typeof rawUserId === "string" ? rawUserId : undefined;
	const eventId = params?.eid ? Number(params.eid) : undefined;
	const giftEvent = useAppSelector((state) =>
		eventId ? selectGiftEventById(state, eventId) : undefined
	);
	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	const participantsStatus = useAppSelector(selectParticipantsStatus);

	const participant = useAppSelector((state) =>
		userId ? selectParticipantById(state, userId) : undefined
	);

	const selectGifts = useMemo(() => {
		if (!currUser) return () => [];
		return selectParticipantGifts(currUser);
	}, [currUser]);

	const participantGifts = useAppSelector(selectGifts);

	const participantGiftsStatus = useAppSelector(selectParticipantGiftsStatus);
	const participantGiftStatus = useAppSelector(updateParticipantGiftStatus);

	// debugger;
	useEffect(() => {
		document.title = `Gifts | GiftListPal`;
	}, []);

	useEffect(() => {
		if (giftEventsStatus === "idle") {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, dispatch]);

	useEffect(() => {
		if (participantsStatus === "idle") {
			eventId ? dispatch(getParticipants(eventId)) : undefined;
		}
	}, [participantsStatus, dispatch]);

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

	const handleGiftClick = async (
		updatedGift: patchGiftRequest,
		currReservedByUserId: string | null
	) => {
		if (participantGiftStatus === "loading") {
			console.log("Update ignored: still processing previous update");
			return;
		}

		if (
			currReservedByUserId !== currUser &&
			currReservedByUserId !== null
		) {
			alert("Already reserved by another user");
			return;
		}

		if (typeof eventId === "number" && typeof userId === "string") {
			const result = await dispatch(
				updateParticipantGift({
					...updatedGift,
					eventId,
					participantId: userId,
				})
			);
		}
	};

	if (!eventId) {
		return <div>No event id found.</div>;
	}

	if (!userId) {
		return <div>No gift user id found.</div>;
	}

	if (!participant) {
		return <></>;
	}

	// debugger;
	if (!participant?.user?.name) {
		return <></>;
	}

	return (
		<AuthGuard>
			{giftEventsStatus === "succeeded" &&
				giftEvent &&
				participantGiftsStatus === "succeeded" &&
				participantGifts && (
					<main>
						<ItemGridHeader
							eventName={giftEvent?.name}
							participantName={participant.user.name}
							description={
								participant.user.id === currUser
									? "Add gifts to your wishlist!"
									: "Add or reserve gifts"
							}
						></ItemGridHeader>
						<AddItemLink
							variant={"gift"}
							userId={userId}
							eventId={eventId}
						/>
						<GiftList
							gifts={participantGifts}
							handleGiftClick={handleGiftClick}
							currentUserId={currUser}
						/>

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
