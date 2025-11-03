import { Event as PrismaEvent } from "@prisma/client";

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

export type EventsResponse = SuccessResponse<PrismaEvent[]>;
export type EventResponse = SuccessResponse<PrismaEvent>;
