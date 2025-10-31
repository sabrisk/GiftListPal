"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { inviteParticipant } from "@/features/Participants/participantsSlice";
import { useAppDispatch } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Invite() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [invite, setInvite] = useState({
		email: "",
		type: "",
	});
	const [inviteSentMessage, setInviteSentMessage] = useState("");

	const params = useParams();
	const id = params?.id ? Number(params.id) : undefined;

	if (!id) {
		return <div>Invalid event ID</div>;
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setInvite((prev) => ({ ...prev, [name]: value }));
	};

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const result = await dispatch(
				inviteParticipant({ ...invite, eventId: id })
			).unwrap();
			setInviteSentMessage(result.message);
			router.push(`/events/${id}/participants`);
		} catch (err: any) {
			console.log(err);
			setInviteSentMessage(err || "Failed to send invite.");
		}

		// if (result.success) {
		// 	setInviteSentMessage("Invite sent successfully!");
		// 	router.push(`/events/${id}/participants`);
		// } else {
		// 	setInviteSentMessage("Failed to send invite.");
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
				<h1 className="text-3xl mt-15 mb-6 font-bold">Invite</h1>
				<h1 className="text-2xl mt-2mb-6 ">Christmas 2025</h1>
			</header>
			<form className="flex flex-col gap-4 mt-6 max-w-sm mx-auto">
				<label className="flex flex-col">
					<span className="mb-1 font-medium">E-mail</span>
					<input
						onChange={handleChange}
						type="text"
						name="email"
						className="border rounded px-3 py-2 bg-gray-900 text-white"
						required
						value={invite.email}
					/>
				</label>

				<RadioGroup
					value={invite.type}
					onValueChange={(value: string) =>
						setInvite((prev) => ({ ...prev, type: value }))
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
				{inviteSentMessage && (
					<p className="text-green-500 font-medium">
						{inviteSentMessage}
					</p>
				)}
				<button
					onClick={handleClick}
					type="submit"
					className="mt-4  bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
				>
					Send Invite
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
