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

export const userSelect = {
	id: true,
	email: true,
	createdAt: true,
	emailVerified: true,
	image: true,
	updatedAt: true,
	name: true,
} satisfies Prisma.UserSelect;

export const giftSelect = {
	id: true,
	name: true,
	link: true,
	eventId: true,
	recipientUserId: true,
	addedByUserId: true,
	reservedByUserId: true,
	createdAt: true,
} satisfies Prisma.GiftSelect;
