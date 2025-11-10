import { Prisma } from "@prisma/client";
import { userSelect } from "@lib/prismaSelects";

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

export interface patchUserRequest {
	uid: string;
	name?: string;
}

export type User = Prisma.UserGetPayload<{
	select: typeof userSelect;
}>;
