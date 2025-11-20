import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { auth } from "../../../../auth";
import { SuccessResponse, ErrorResponse } from "@/types/user";
import { userSelect } from "@lib/prismaSelects";
import { User, patchUserRequest } from "@/types/user";

const successResponse = <T>(data: T, message: string): SuccessResponse<T> => ({
	success: true,
	data,
	message,
});

const errorResponse = (code: string, message: string): ErrorResponse => ({
	success: false,
	code,
	message,
});

export async function GET(
	request: Request,
	{ params }: { params: { uid: string } }
) {
	const { uid } = await params;
	const session = await auth();

	if (!session?.user?.id) {
		return NextResponse.json(
			errorResponse("UNAUTHORIZED", "Unauthorized"),
			{ status: 401 }
		);
	}

	try {
		// console.log("Fetching participants for event:", session.user.id);

		const user = await prisma.user.findUnique({
			where: {
				id: uid,
			},
			select: userSelect,
		});

		return NextResponse.json(
			successResponse(user, "User retreived successfully"),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Unhandled error in user route:", error);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { uid: string } }
) {
	try {
		const { uid, name }: patchUserRequest = await request.json();

		if (!uid || !name) {
			return NextResponse.json(
				errorResponse("BAD_REQUEST", "Missing userId or name"),
				{ status: 400 }
			);
		}
		const updatedUser = await prisma.user.update({
			where: { id: uid },
			data: { name },
			select: userSelect,
		});

		if (!updatedUser) {
			return NextResponse.json(
				errorResponse("NOT_FOUND", "User could not be updated"),
				{ status: 500 }
			);
		}
		return NextResponse.json(
			successResponse(updatedUser, "User updated successfully"),
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error updating user:", err);
		return NextResponse.json(
			errorResponse("INTERNAL_ERROR", "Internal server error"),
			{ status: 500 }
		);
	}
}

export async function OPTIONS() {
	return NextResponse.json(
		{ error: "Method Not Allowed" },
		{
			status: 405,
			headers: { Allow: "GET, PATCH" },
		}
	);
}
