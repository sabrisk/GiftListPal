"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { postGiftEvent } from "@/features/GiftEvents/GiftEventsSlice";
import { useRouter } from "next/navigation";

export default function AddEvent() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [event, setEvent] = useState({
		name: "",
		date: "",
		description: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEvent((prev) => ({ ...prev, [name]: value }));
	};

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// @ts-ignore
		dispatch(postGiftEvent(event));
		router.push("/events");
		// localStorage.setItem("event", JSON.stringify(event));

		// try {
		// 	const response = await fetch("http://localhost:3001/AddEvent", {
		// 		method: "POST",
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(event),
		// 	});

		// 	if (!response.ok) {
		// 		const error = await response.text();
		// 		alert(`Add Event failed: ${error}`);
		// 		return;
		// 	}

		// 	const jsonResponse = await response.json();
		// 	// do other things like redirect users to another page
		// } catch (error) {
		// 	alert("An error occurred");
		// }
	};

	return (
		<div className="p-3">
			<header className="flex justify-end items-start">
				<button
					className="fixed top-0 left-0 w-12 h-12 pb-1 bg-gray-600 text-white text-4xl border border-slate-600 flex items-center justify-center  hover:bg-gray-500 transition-colors"
					aria-label="Back"
				>
					&lsaquo;
				</button>
			</header>
			<header className="flex flex-col items-center">
				<h1 className="text-3xl mt-15 mb-6 font-bold">Add Event</h1>
			</header>
			<form className="flex flex-col gap-4 mt-6 max-w-sm mx-auto">
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Name</span>
					<input
						onChange={handleChange}
						type="text"
						name="name"
						autoComplete="off"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						maxLength={36}
						value={event.name}
					/>
				</label>
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Date</span>
					<input
						onChange={handleChange}
						type="text"
						name="date"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						value={event.date}
					/>
				</label>
				<label className="flex flex-col">
					<span className="mb-1 font-medium">Description</span>
					<textarea
						name="description"
						value={event.description}
						onChange={handleChange}
						maxLength={180}
						className="border rounded px-3 py-2 bg-gray-900 text-white resize-none h-32"
						required
					/>
				</label>
				<button
					onClick={handleClick}
					type="submit"
					className="mt-4  bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
				>
					Add Event
				</button>
			</form>
		</div>
	);
}

{
	/* <button
					className="bg-gray-600 text-white text-4xl border border-slate-600 flex items-center justify-center  hover:bg-gray-500 transition-colors"
					aria-label="Back"
				>
					&lsaquo;
				</button> */
}
