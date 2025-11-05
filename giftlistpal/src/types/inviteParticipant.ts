export interface InviteSuccessResponse {
	success: true;
	message: string;
}

export interface InviteErrorResponse {
	success: false;
	code: string;
	message: string;
}

export interface InvitePayload {
	eventId: number;
	email: string;
}
export type ApiInviteResponse = InviteSuccessResponse | InviteErrorResponse;
