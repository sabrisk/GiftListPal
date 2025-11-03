import { Prisma } from "@prisma/client";

export const participantSelect = {
	isShopper: true,
	isRecipient: true,
	user: { select: { id: true, name: true } },
	event: { select: { id: true, name: true } },
} satisfies Prisma.EventParticipantSelect;
