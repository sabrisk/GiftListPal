import { Prisma } from "@prisma/client";
import { participantSelect } from "@lib/prismaSelects";

export type Participant = Prisma.EventParticipantGetPayload<{
	select: typeof participantSelect;
}>;
