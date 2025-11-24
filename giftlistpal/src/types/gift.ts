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

export interface PostGiftSuccessPayload {
	gift: Gift;
	message: string;
}

export type UpdateGiftPayload = Pick<
	CreateGiftRequestPost,
	"eventId" | "participantId"
> &
	Partial<Omit<CreateGiftRequestPost, "eventId" | "participantId">>;

export interface patchGiftRequest {
	id: number;
	name?: string;
	link?: string | null;
	eventId?: number;
	participantId?: string;
	addedByUserId?: string;
	reservedByUserId?: string | null;
}
