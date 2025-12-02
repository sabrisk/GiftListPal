import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import {
	Gift,
	CreateGiftRequestGet,
	CreateGiftRequestPost,
	PostGiftSuccessPayload,
	UpdateGiftPayload,
} from "@/types/gift";

interface GiftsState {
	list: Gift[];
	getParticipantGiftsStatus: "idle" | "loading" | "succeeded" | "failed";
	postParticipantGiftStatus: "idle" | "loading" | "succeeded" | "failed";
	updateParticipantGiftStatus: "idle" | "loading" | "succeeded" | "failed";
	postParticipantGiftError?: string | null;
	updateParticipantGiftError?: string | null;
}

const initialState: GiftsState = {
	list: [],
	getParticipantGiftsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postParticipantGiftStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	updateParticipantGiftStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postParticipantGiftError: null,
	updateParticipantGiftError: null,
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

export const updateParticipantGift = createAsyncThunk<
	PostGiftSuccessPayload,
	UpdateGiftPayload,
	{ rejectValue: string }
>("gifts/updateParticipantGift", async (updatedGift, { rejectWithValue }) => {
	try {
		console.log("updated gift in slice", updatedGift);
		const response = await fetch(
			`/api/events/${updatedGift.eventId}/participants/${updatedGift.participantId}/gifts`, //map this to recipientUserId in the route when adding to gifts table
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedGift),
			}
		);

		const json = await response.json();

		if (!response.ok || !json.success) {
			const message = json.message || "Failed to update gift";
			return rejectWithValue(message);
		}
		return {
			gift: json.data, // the updated gift object
			message: json.message, // success message from API
		};
	} catch (err: any) {
		if (err instanceof TypeError && err.message === "Failed to fetch") {
			return rejectWithValue(
				"Unable to connect to the server. Please try again later."
			);
		}

		console.error("updateGift error:", err);
		return rejectWithValue(err.message);
	}
});

export const postParticipantGift = createAsyncThunk<
	PostGiftSuccessPayload,
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
		const json = await response.json();

		if (!response.ok || !json.success) {
			const message = json.message || "Failed to add gift";
			return rejectWithValue(message);
		}
		return {
			gift: json.data, // the new gift object
			message: json.message, // success message from API
		};
	} catch (err: any) {
		if (err instanceof TypeError && err.message === "Failed to fetch") {
			return rejectWithValue(
				"Unable to connect to the server. Please try again later."
			);
		}

		console.error("postGift error:", err);
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
				state.list.push(action.payload.gift);
			})
			.addCase(postParticipantGift.rejected, (state, action) => {
				state.postParticipantGiftStatus = "failed";
				state.postParticipantGiftError = action.payload;
			})
			.addCase(updateParticipantGift.pending, (state) => {
				state.updateParticipantGiftStatus = "loading";
			})
			.addCase(updateParticipantGift.fulfilled, (state, action) => {
				state.updateParticipantGiftStatus = "succeeded";
				const updated = action.payload.gift;
				const existing = state.list.find((g) => g.id === updated.id);

				if (existing) {
					existing.reservedByUserId = updated.reservedByUserId;
				}
			})
			.addCase(updateParticipantGift.rejected, (state, action) => {
				state.updateParticipantGiftStatus = "failed";
				state.updateParticipantGiftError = action.payload;
			});
	},
});

// export const selectParticipantGifts = (state: RootState) => state.gifts.list;

export const selectParticipantGifts = (currentUserId: string) =>
	createSelector(
		(state: RootState) => state.gifts.list,
		(gifts) => {
			return [...gifts]
				.filter((gift) => {
					if (
						gift.recipientUserId === currentUserId &&
						gift.addedByUserId !== currentUserId
					) {
						return false;
					}
					return true;
				})
				.sort((a, b) => {
					const aOwned =
						a.reservedByUserId === null ||
						a.reservedByUserId === currentUserId;

					const bOwned =
						b.reservedByUserId === null ||
						b.reservedByUserId === currentUserId;

					// Owned/available first
					if (aOwned && !bOwned) return -1;
					if (!aOwned && bOwned) return 1;

					// Alphabetical inside each group
					return a.name.localeCompare(b.name);
				});
		}
	);
export const selectParticipantGiftsStatus = (state: RootState) =>
	state.gifts.getParticipantGiftsStatus;
export const updateParticipantGiftStatus = (state: RootState) =>
	state.gifts.updateParticipantGiftStatus;

// export const selectGiftEventById = (state: RootState, eventId: number) => {
// 	return state.gifts.list.find((giftEvent) => giftEvent.id === eventId);
// };
export const { resetParticipantGifts } = giftsSlice.actions;
export default giftsSlice.reducer;
