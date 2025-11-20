import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import {
	Gift,
	CreateGiftRequestGet,
	CreateGiftRequestPost,
	ApiGiftParticipantResponse,
} from "@/types/gift";

interface GiftsState {
	list: Gift[];
	getParticipantGiftsStatus: "idle" | "loading" | "succeeded" | "failed";
	postParticipantGiftStatus: "idle" | "loading" | "succeeded" | "failed";
	postParticipantGiftError?: string | null;
}

const initialState: GiftsState = {
	list: [],
	getParticipantGiftsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postParticipantGiftStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postParticipantGiftError: null,
};

export const getParticipantGifts = createAsyncThunk<
	Gift[],
	CreateGiftRequestGet,
	{ rejectValue: string }
>(
	"gifts/getParticipantGifts",
	async ({ eventId, userId }, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`/api/events/${eventId}/participants/${userId}/gifts`
			);
			const responseData = await response.json();

			if (!response.ok || !responseData.success) {
				const message =
					responseData.message ||
					"Failed to retrieve participant gifts";
				return rejectWithValue(message);
			}
			return responseData.data;
		} catch (err: any) {
			if (err instanceof TypeError && err.message === "Failed to fetch") {
				return rejectWithValue(
					"Unable to connect to the server. Please try again later."
				);
			}
			console.log("Get gifts error", err);
			return rejectWithValue(err.message);
		}
	}
);

export const postParticipantGift = createAsyncThunk<
	ApiGiftParticipantResponse,
	CreateGiftRequestPost,
	{ rejectValue: string }
>("gifts/postGiftEvent", async (newGift, { rejectWithValue }) => {
	try {
		const response = await fetch(
			`/api/events/${newGift.eventId}/participants/${newGift.participantId}/gifts/new`, //map this to recipientUserId in the route when adding to gifts table
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newGift),
			}
		);
		debugger;
		const responseData = await response.json();

		if (!response.ok || !responseData.success) {
			const message = responseData.message || "Failed to add gift";
			return rejectWithValue(message);
		}
		return responseData;
	} catch (err: any) {
		if (err instanceof TypeError && err.message === "Failed to fetch") {
			return rejectWithValue(
				"Unable to connect to the server. Please try again later."
			);
		}

		console.error("postGiftEvent error:", err);
		return rejectWithValue(err.message);
	}
});

const giftsSlice = createSlice({
	name: "gifts",
	initialState,
	reducers: {
		resetParticipantGifts: (state) => initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(getParticipantGifts.pending, (state) => {
				state.getParticipantGiftsStatus = "loading";
			})
			.addCase(getParticipantGifts.fulfilled, (state, action) => {
				state.getParticipantGiftsStatus = "succeeded";
				state.list = action.payload;
			})
			.addCase(getParticipantGifts.rejected, (state, action) => {
				state.getParticipantGiftsStatus = "failed";
			})
			.addCase(postParticipantGift.pending, (state) => {
				state.postParticipantGiftStatus = "loading";
			})
			.addCase(postParticipantGift.fulfilled, (state, action) => {
				state.postParticipantGiftStatus = "succeeded";
				state.list.push(action.payload);
				console.log(action.payload);
			})
			.addCase(postParticipantGift.rejected, (state, action) => {
				state.postParticipantGiftStatus = "failed";
				state.postParticipantGiftError = action.payload;
			});
	},
});

export const selectParticipantGifts = (state: RootState) => state.gifts.list;

export const selectParticipantGiftsStatus = (state: RootState) =>
	state.gifts.getParticipantGiftsStatus;

// export const selectGiftEventById = (state: RootState, eventId: number) => {
// 	return state.gifts.list.find((giftEvent) => giftEvent.id === eventId);
// };
export const { resetParticipantGifts } = giftsSlice.actions;
export default giftsSlice.reducer;
