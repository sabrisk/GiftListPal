"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter, useParams } from "next/navigation";

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
} from "@/features/GiftEvents/GiftEventsSlice";

function Participants() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const id = params?.id;

	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	const giftEvent = useAppSelector((state) => selectGiftEventById(state, id));

	const participants = useAppSelector(selectAllParticipants);
	const participantsStatus = useAppSelector(selectParticipantsStatus);

	useEffect(() => {
		if (giftEventsStatus === "idle") {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, dispatch]);

	useEffect(() => {
		if (participantsStatus === "idle" && typeof id === "string") {
			// @ts-ignore
			dispatch(getParticipants(id)); // safe now
		}
	}, [participantsStatus, dispatch, id]);

	useEffect(() => {
		return () => {
			dispatch(resetParticipants());
		};
	}, [dispatch]);

	return (
		<main className="p-6">
			<nav className="flex justify-end items-start">
				<BackButton />
			</nav>

			{giftEventsStatus === "succeeded" && giftEvent && (
				<GridContainer
					// title={"Participants"}
					title={giftEvent.name}
					description={giftEvent.description}
					variant={"participant"}
				>
					<ListGrid items={participants} />
				</GridContainer>
			)}
			<button
				className="md:hidden fixed bottom-7 right-7 w-16 h-16 bg-gray-600 text-white text-4xl border border-slate-600 rounded-full flex items-center justify-center  hover:bg-gray-500 transition-colors"
				aria-label="Add Event"
			>
				+
			</button>
		</main>
	);
}

export default Participants;
