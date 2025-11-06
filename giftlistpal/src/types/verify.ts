export interface VerifySuccessResponse {
	success: true;
	data: { eventId: number };
}

export interface VerifyErrorResponse {
	success: false;
	code: string;
}
