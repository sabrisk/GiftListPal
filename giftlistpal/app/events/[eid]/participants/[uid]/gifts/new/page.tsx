"use client";

import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";

import AuthGuard from "@/components/AuthGuard";

import { postParticipantGift } from "@/features/Gifts/giftsSlice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface NewGift {
	name: string;
	link?: string;
}

export default function AddGift() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const { data: session } = useSession();

	const eventId = params?.eid ? Number(params.eid) : undefined;
	const participantId = params?.uid ? params.uid : undefined;
	const addedByUserId = session?.user?.id;

	//will probably use this to ensure that the participant is loaded,
	//and to get their name to display. Refer to the invite page

	// const giftEvent = useAppSelector((state) =>
	// 	eid ? selectGiftEventById(state, eid) : null
	// );

	const [errorDialogOpen, setErrorDialogOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// update this to go back to participants page if the participant
	// doesn't exist

	// useEffect(() => {
	// 	if (!giftEvent) {
	// 		router.replace("/events");
	// 		return;
	// 	}
	// }, [giftEvent, router]);

	const handleSubmit = async (values: NewGift) => {
		try {
			if (
				typeof eventId !== "number" ||
				typeof participantId !== "string" ||
				typeof addedByUserId !== "string"
			)
				return;
			const result = await dispatch(
				postParticipantGift({
					...values,
					eventId,
					participantId,
					addedByUserId,
				})
			).unwrap();
			toast.success(result.message);
			router.replace(
				`/events/${eventId}/participants/${participantId}/gifts`
			);
		} catch (err: any) {
			console.error(err);
			setErrorMessage(err || "Failed to add gift. Please try again.");
			setErrorDialogOpen(true);
		}
	};

	const validate = (values: NewGift) => {
		const errors: Partial<NewGift> = {};
		if (!values.name?.trim()) {
			errors.name = "*Required";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			link: "",
		},
		validate: validate,
		onSubmit: handleSubmit,
	});

	return (
		<AuthGuard>
			<div className="p-3 ">
				<header className="flex justify-end items-start"></header>
				<header className="flex flex-col items-center">
					<h1 className="text-3xl mt-15 mb-6 font-bold">Add Gift</h1>
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
						<div className="text-red-500">{formik.errors.name}</div>
					) : null}
					<label className="flex flex-col">
						<span className="mb-1 font-medium">Link</span>
						<input
							onChange={formik.handleChange}
							id="link"
							type="text"
							name="link"
							autoComplete="off"
							className="border rounded px-3 py-2"
							value={formik.values.link}
						/>
					</label>
					<button
						type="submit"
						className="mt-4 bg-[var(--primary)] text-[var(--primary-text)] font-semibold py-2 rounded"
					>
						Add Gift
					</button>
				</form>
				<Dialog
					open={errorDialogOpen}
					onOpenChange={setErrorDialogOpen}
				>
					<DialogContent>
						<DialogHeader className="">
							<DialogTitle className="mb-3">
								Adding Gift Failed
							</DialogTitle>
							<DialogDescription className="mt-4 text-center mb-4 text-lg">
								{errorMessage ||
									"An unexpected error occurred. Please try again later."}
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="mx-auto">
							<Button
								className="bg-[var(--primary)] text-[var(--primary-text)] font-semibold"
								size="default"
								onClick={() => setErrorDialogOpen(false)}
							>
								OK
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</AuthGuard>
	);
}
