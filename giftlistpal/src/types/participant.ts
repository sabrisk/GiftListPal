import { Prisma } from "@prisma/client";
import { participantSelect } from "@lib/prismaSelects";

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

export type Participant = Prisma.EventParticipantGetPayload<{
	select: typeof participantSelect;
}>;
