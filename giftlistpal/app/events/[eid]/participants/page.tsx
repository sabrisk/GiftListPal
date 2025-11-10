"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

import ItemGridHeader from "@/components/ItemGridHeader";
import ListGrid from "@/components/ListGrid";

import {
	getParticipants,
	selectAllParticipants,
	selectParticipantsStatus,
	resetParticipants,
} from "@/features/Participants/participantsSlice";

import {
	getGiftEvents,
	selectGiftEventsStatus,
	selectGiftEventById,
} from "@/features/GiftEvents/giftEventsSlice";

import AuthGuard from "@/components/AuthGuard";
import AddItemLink from "@/components/AddItemLink";
import AddItemLinkMobile from "@/components/AddItemLinkMobile";

function Participants() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const eid = params?.eid ? Number(params.eid) : undefined;
	if (!eid) {
		return <div>No event id found.</div>;
	}

	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	const participantsStatus = useAppSelector(selectParticipantsStatus);

	const giftEvent = useAppSelector((state) =>
		selectGiftEventById(state, eid)
	);
	const participants = useAppSelector(selectAllParticipants);

	useEffect(() => {
		document.title = `People | GiftListPal`;
	}, []);

	useEffect(() => {
		if (giftEventsStatus === "idle") {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, dispatch]);

	useEffect(() => {
		if (participantsStatus === "idle" && typeof eid === "number") {
			dispatch(getParticipants(eid));
		}
	}, [participantsStatus, dispatch, eid]);

	useEffect(() => {
		return () => {
			dispatch(resetParticipants());
		};
	}, [dispatch]);

	return (
		<AuthGuard>
			<main>
				{giftEventsStatus === "succeeded" && giftEvent && (
					<>
						<ItemGridHeader
							title={giftEvent.name}
							description={giftEvent.description}
						></ItemGridHeader>
						<AddItemLink variant={"participant"} eventId={eid} />
						<ListGrid
							variant={"participant"}
							items={participants}
						/>
					</>
				)}

				<AddItemLinkMobile variant={"participant"} eventId={eid} />
			</main>
		</AuthGuard>
	);
}

export default Participants;
