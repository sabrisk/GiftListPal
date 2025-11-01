"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import { inviteParticipant } from "@/features/Participants/participantsSlice";
import { useAppDispatch } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

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

interface Invite {
	email: string;
	type: string;
}

const validate = (values: Invite, session: Session | null) => {
	const errors: Partial<Invite> = {};
	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	} else if (values.email === session?.user?.email) {
		errors.email = "Error: You cannot invite yourself";
	}
	if (!values.type) {
		errors.type = "Required";
	}
	return errors;
};

export default function Invite() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const { data: session, status } = useSession();
	const id = params?.id ? Number(params.id) : undefined;

	const [inviteSentMessage, setInviteSentMessage] = useState("");
	const [errorDialogOpen, setErrorDialogOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	if (!id) {
		return <div>Invalid event ID</div>;
	}

	const handleSubmit = async (values: Invite) => {
		try {
			setInviteSentMessage("");
			const result = await dispatch(
				inviteParticipant({ ...values, eventId: id })
			).unwrap();
			console.log("from try");
			setInviteSentMessage(result.message);
			router.push(`/events/${id}/participants`);
		} catch (err: any) {
			console.log("from catch", err);
			setErrorMessage(err || "Failed to send invite. Please try again.");
			setErrorDialogOpen(true);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			type: "",
		},
		validate: (values) => validate(values, session),
		onSubmit: handleSubmit,
	});

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
				<h1 className="text-3xl mt-15 mb-6 font-bold">Invite</h1>
				<h1 className="text-2xl mt-2mb-6 ">Christmas 2025</h1>
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
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						onChange={formik.handleChange}
						value={formik.values.email}
						onBlur={formik.handleBlur}
					/>
				</label>
				{formik.touched.email && formik.errors.email ? (
					<div className="text-red-500 font-">
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
					<div>{formik.errors.type}</div>
				) : null}
				{inviteSentMessage && (
					<p className="text-green-500 font-medium">
						{inviteSentMessage}
					</p>
				)}
				<button
					type="submit"
					className="mt-4 bg-[#F5EFE7] hover:bg-[#beb7af] text-black font-semibold py-2 rounded"
				>
					Send Invite
				</button>
			</form>

			{/* 💬 Error Dialog */}
			<Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Invite Failed</DialogTitle>
						<DialogDescription>
							{errorMessage ||
								"An unexpected error occurred. Please try again later."}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant="invite"
							size="default"
							onClick={() => setErrorDialogOpen(false)}
						>
							OK
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
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
