"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";

import ListGrid from "@/components/ListGrid";
import BackButton from "@/components/BackButton";
import GridContainer from "@/components/GridContainer";

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

function Participants() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const id = params?.id ? Number(params.id) : undefined;
	if (!id) {
		return <div>No event id found.</div>;
	}

	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	const participantsStatus = useAppSelector(selectParticipantsStatus);

	const giftEvent = useAppSelector((state) => selectGiftEventById(state, id));
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
		if (participantsStatus === "idle" && typeof id === "number") {
			dispatch(getParticipants(id));
		}
	}, [participantsStatus, dispatch, id]);

	useEffect(() => {
		return () => {
			dispatch(resetParticipants());
		};
	}, [dispatch]);

	return (
		<AuthGuard>
			<main>
				{giftEventsStatus === "succeeded" && giftEvent && (
					<GridContainer
						variant={"participant"}
						title={giftEvent.name}
						description={giftEvent.description}
						eventId={id}
					>
						<ListGrid
							variant={"participant"}
							items={participants}
						/>
					</GridContainer>
				)}
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
					aria-label="Add Event"
				>
					+
				</button>
			</main>
		</AuthGuard>
	);
}

export default Participants;
