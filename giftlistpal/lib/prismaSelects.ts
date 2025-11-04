import { Prisma } from "@prisma/client";

export const eventSelect = {
	id: true,
	name: true,
	date: true,
	description: true,
	ownerId: true,
	createdAt: true,
} satisfies Prisma.EventSelect;

export const participantSelect = {
	isShopper: true,
	isRecipient: true,
	user: { select: { id: true, name: true } },
	event: { select: { id: true, name: true } },
} satisfies Prisma.EventParticipantSelect;
