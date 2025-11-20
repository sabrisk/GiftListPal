import { Prisma } from "@prisma/client";
import { giftSelect } from "@lib/prismaSelects";

export interface CreateGiftRequestGet {
	eventId: number;
	userId: string;
}

export interface CreateGiftRequestPost {
	name: string;
	link?: string | null;
	eventId: number;
	participantId: string;
	addedByUserId: string;
}

export interface SuccessResponse<T> {
	success: true;
	data: T;
	message: string;
}

export interface ErrorResponse {
	success: false;
	code: string;
	message: string;
}

export type Gift = Prisma.GiftGetPayload<{
	select: typeof giftSelect;
}>;

export type ApiGiftParticipantResponse = SuccessResponse<Gift> | ErrorResponse;
