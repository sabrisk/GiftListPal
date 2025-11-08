"use client";

import { useAppDispatch } from "@/store/hooks";
import { postGiftEvent } from "@/features/GiftEvents/giftEventsSlice";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { useFormik } from "formik";

interface NewEvent {
	name: string;
	date: string;
	description: string;
}

const validate = (values: NewEvent) => {
	const errors: Partial<NewEvent> = {};
	if (!values.name?.trim()) {
		errors.name = "*Required";
	}
	if (!values.date) {
		errors.date = "*Required";
	}
	if (!values.description?.trim()) {
		errors.description = "*Required";
	}
	return errors;
};

export default function AddEvent() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleSubmit = async (values: NewEvent) => {
		try {
			await dispatch(postGiftEvent(values));
			router.push("/events");
		} catch (err) {
			console.error(err);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			date: "",
			description: "",
		},
		validate: validate,
		onSubmit: handleSubmit,
	});

	return (
		<AuthGuard>
			<div className="p-3 ">
				<header className="flex justify-end items-start"></header>
				<header className="flex flex-col items-center">
					<h1 className="text-3xl mt-15 mb-6 font-bold">Add Event</h1>
				</header>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 mt-6 max-w-sm mx-auto"
				>
					<label className="flex flex-col">
						<span className="mb-1 font-medium">Name</span>
						<input
							onChange={formik.handleChange}
							id="name"
							type="text"
							name="name"
							autoComplete="off"
							className="border rounded px-3 py-2"
							maxLength={36}
							value={formik.values.name}
							onBlur={formik.handleBlur}
						/>
					</label>
					{formik.touched.name && formik.errors.name ? (
						<div className="">{formik.errors.name}</div>
					) : null}
					<label className="flex flex-col">
						<span className="mb-1 font-medium">Date</span>
						<input
							className="border rounded px-3 py-2"
							id="date"
							type="date"
							name="date"
							min={new Date().toISOString().split("T")[0]}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.date}
						/>
					</label>
					{formik.touched.date && formik.errors.date ? (
						<div className="">{formik.errors.date}</div>
					) : null}
					<label className="flex flex-col">
						<span className="mb-1 font-medium">Description</span>
						<textarea
							className="border rounded px-3 py-2 resize-none h-32"
							id="description"
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							maxLength={180}
							onBlur={formik.handleBlur}
						/>
					</label>
					{formik.touched.description && formik.errors.description ? (
						<div className="">{formik.errors.description}</div>
					) : null}
					<button
						type="submit"
						className="mt-4 bg-[var(--primary)] text-[var(--primary-text)] font-semibold py-2 rounded"
					>
						Add Event
					</button>
				</form>
			</div>
		</AuthGuard>
	);
}
