import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { EventParticipant as PrismaParticipant } from "@prisma/client";
import { Participant } from "@/types/participant";

interface ParticipantInvite {
	id: number;
	email: string;
}

interface ParticipantsState {
	list: Participant[];
	getParticipantsStatus: "idle" | "loading" | "succeeded" | "failed";
	getParticipantsError: string | null;
	inviteParticipantStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ParticipantsState = {
	list: [],
	getParticipantsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	getParticipantsError: null,
	inviteParticipantStatus: "idle",
};

interface InvitePayload {
	eventId: number;
	email: string;
}
interface InviteSuccessResponse {
	success: true;
	message: string;
}

interface InviteErrorResponse {
	success: false;
	message: string;
	code: string;
}

type ApiInviteResponse = InviteSuccessResponse | InviteErrorResponse;

export const getParticipants = createAsyncThunk<
	Participant[],
	number,
	{ rejectValue: string }
>("participants/getParticipants", async (id, { rejectWithValue }) => {
	try {
		const response = await fetch(`/api/events/${id}/participants`);
		if (!response.ok) throw new Error("Failed to fetch participants");
		return (await response.json()) as Participant[];
	} catch (err: any) {
		return rejectWithValue(err.message);
	}
});

export const inviteParticipant = createAsyncThunk<
	ApiInviteResponse,
	InvitePayload,
	{ rejectValue: string }
>(
	"participants/inviteParticipant",
	async ({ eventId, email }, { rejectWithValue }) => {
		// const invite = { eventId, email };
		try {
			const response = await fetch(
				`/api/events/${eventId}/participants/invite/send`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ eventId, email }),
				}
			);
			const data: ApiInviteResponse = await response.json();

			if (!response.ok || !data.success) {
				const message = data.message || "Failed to send invite";
				return rejectWithValue(message);
			}

			return data;
		} catch (err: any) {
			if (err instanceof TypeError && err.message === "Failed to fetch") {
				return rejectWithValue(
					"Unable to connect to the server. Please try again later."
				);
			}

			console.log("thunk invite error", err);
			return rejectWithValue(err.message);
		}
	}
);

const participantsSlice = createSlice({
	name: "participants",
	initialState,
	reducers: {
		resetParticipants: () => initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(getParticipants.pending, (state) => {
				state.getParticipantsStatus = "loading";
			})
			.addCase(getParticipants.fulfilled, (state, action) => {
				state.getParticipantsStatus = "succeeded";
				state.list = action.payload;
			})
			.addCase(getParticipants.rejected, (state, action) => {
				state.getParticipantsStatus = "failed";
				state.getParticipantsError = action.payload as string;
			})
			.addCase(inviteParticipant.pending, (state) => {
				state.inviteParticipantStatus = "loading";
			})
			.addCase(
				inviteParticipant.fulfilled,
				(state, action: PayloadAction<ApiInviteResponse>) => {
					state.inviteParticipantStatus = "succeeded";
					console.log("invite success", action.payload);
				}
			)
			.addCase(inviteParticipant.rejected, (state, action) => {
				state.inviteParticipantStatus = "failed";
			});
	},
});

export const selectAllParticipants = (state: RootState) =>
	state.participants.list;

export const selectParticipantsStatus = (state: RootState) =>
	state.participants.getParticipantsStatus;
export const { resetParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;
