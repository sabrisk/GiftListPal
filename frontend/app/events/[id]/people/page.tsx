"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter, useParams } from "next/navigation";

import ListGrid from "../../../../src/components/ListGrid";
import BackButton from "../../../../src/components/BackButton";
import GridContainer from "../../../../src/components/GridContainer";

import {
	getPeople,
	selectAllPeople,
	selectPeopleStatus,
	resetPeople,
} from "@/features/People/PeopleSlice";

import {
	getGiftEvents,
	selectGiftEventsStatus,
	selectGiftEventById,
} from "@/features/GiftEvents/GiftEventsSlice";

function People() {
	const dispatch = useAppDispatch();
	const params = useParams();
	const id = params?.id;

	const giftEventsStatus = useAppSelector(selectGiftEventsStatus);
	const giftEvent = useAppSelector((state) => selectGiftEventById(state, id));

	const people = useAppSelector(selectAllPeople);
	const peopleStatus = useAppSelector(selectPeopleStatus);

	useEffect(() => {
		if (giftEventsStatus === "idle") {
			dispatch(getGiftEvents());
		}
	}, [giftEventsStatus, dispatch]);

	useEffect(() => {
		if (peopleStatus === "idle" && typeof id === "string") {
			// @ts-ignore
			dispatch(getPeople(id)); // safe now
		}
	}, [peopleStatus, dispatch, id]);

	useEffect(() => {
		return () => {
			dispatch(resetPeople());
		};
	}, [dispatch]);

	return (
		<main className="p-6">
			<nav className="flex justify-end items-start">
				<BackButton />
			</nav>

			{giftEventsStatus === "succeeded" && giftEvent && (
				<GridContainer
					// title={"People"}
					title={giftEvent.name}
					description={giftEvent.description}
					variant={"person"}
				>
					<ListGrid items={people} />
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

export default People;
