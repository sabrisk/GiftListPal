import { Prisma } from "@prisma/client";
import { eventSelect } from "@lib/prismaSelects";

export interface CreateEventRequest {
	name: string;
	date: string;
	description: string;
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

export type Event = Prisma.EventGetPayload<{
	select: typeof eventSelect;
}>;
