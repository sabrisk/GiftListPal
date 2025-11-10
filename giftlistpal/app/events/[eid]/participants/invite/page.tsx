"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import { inviteParticipant } from "@/features/Participants/participantsSlice";
import { useAppDispatch } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import type { Session } from "next-auth";
import { selectGiftEventById } from "@/features/GiftEvents/giftEventsSlice";

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
import AuthGuard from "@/components/AuthGuard";
import { toast } from "sonner";

interface Invite {
	email: string;
	type: string;
}

export default function Invite() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const { data: session, status } = useSession();

	const eid = params?.eid ? Number(params.eid) : undefined;
	const giftEvent = useAppSelector((state) =>
		eid ? selectGiftEventById(state, eid) : null
	);

	const [errorDialogOpen, setErrorDialogOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!giftEvent) {
			router.replace("/events");
			return;
		}
	}, [giftEvent, router]);

	const handleSubmit = async (values: Invite) => {
		try {
			if (!eid) {
				return;
			}
			const result = await dispatch(
				inviteParticipant({ ...values, eventId: eid })
			).unwrap();
			toast.success(result.message);
			router.push(`/events/${eid}/participants`);
		} catch (err: any) {
			setErrorMessage(err || "Failed to send invite. Please try again.");
			setErrorDialogOpen(true);
		}
	};

	const validate = (values: Invite, session: Session | null) => {
		const errors: Partial<Invite> = {};
		if (!values.email) {
			errors.email = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		} else if (values.email === session?.user?.email) {
			errors.email = "Error: You cannot invite yourself";
		}
		if (!values.type) {
			errors.type = "Required";
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			type: "",
		},
		validate: (values) => validate(values, session),
		onSubmit: handleSubmit,
	});

	if (!giftEvent) {
		return null;
	}

	return (
		<AuthGuard>
			<div className="p-3">
				<header className="flex flex-col items-center">
					<h1 className="text-3xl mt-15 mb-6 font-bold">Invite</h1>
					<h1 className="text-2xl mt-2mb-6 ">{giftEvent.name}</h1>
				</header>
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 mt-6 max-w-sm mx-auto"
				>
					<label className="flex flex-col">
						<span className="mb-1 font-medium">E-mail</span>
						<input
							type="email"
							id="email"
							name="email"
							className="border rounded px-3 py-2"
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
						/>
					</label>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-red-500">
							{formik.errors.email}
						</div>
					) : null}

					<RadioGroup
						id="type"
						name="type"
						onBlur={formik.handleBlur}
						value={formik.values.type}
						onValueChange={(value) =>
							formik.setFieldValue("type", value)
						}
					>
						<div className="flex items-center gap-3">
							<RadioGroupItem value="shopper" id="shopper" />
							<Label htmlFor="shopper">Shopper</Label>
						</div>
						<div className="flex items-center gap-3">
							<RadioGroupItem value="recipient" id="recipient" />
							<Label htmlFor="recipient">Recipient</Label>
						</div>
						<div className="flex items-center gap-3">
							<RadioGroupItem value="both" id="both" />
							<Label htmlFor="both">Both</Label>
						</div>
					</RadioGroup>
					{formik.touched.type && formik.errors.type ? (
						<div className="text-red-500">{formik.errors.type}</div>
					) : null}
					{/* {inviteSentMessage && (
						<p className="text-green-500 font-medium">
							{inviteSentMessage}
						</p>
					)} */}
					<button
						type="submit"
						className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-black font-semibold py-2 rounded"
					>
						Send Invite
					</button>
				</form>

				{/* 💬 Error Dialog */}
				<Dialog
					open={errorDialogOpen}
					onOpenChange={setErrorDialogOpen}
				>
					<DialogContent>
						<DialogHeader className="">
							<DialogTitle className="mb-3">
								Invite Failed
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
