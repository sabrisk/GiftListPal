export interface SuccessResponse {
	success: true;
	message: string;
}

export interface ErrorResponse {
	success: false;
	code: string;
	message: string;
}
