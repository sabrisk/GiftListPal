import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import { Event, CreateEventRequest } from "@/types/event";

interface EventsState {
	list: Event[];
	getGiftEventsStatus: "idle" | "loading" | "succeeded" | "failed";
	postGiftEventStatus: "idle" | "loading" | "succeeded" | "failed";
	postGiftEventError?: string | null;
}

const initialState: EventsState = {
	list: [],
	getGiftEventsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postGiftEventStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	postGiftEventError: null,
};

export const getGiftEvents = createAsyncThunk<
	Event[],
	void,
	{ rejectValue: string }
>("giftEvents/getGiftEvents", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch("/api/events");
		const responseData = await response.json();

		if (!response.ok || !responseData.success) {
			const message = responseData.message || "Failed to retrieve events";
			return rejectWithValue(message);
		}
		return responseData.data;
	} catch (err: any) {
		if (err instanceof TypeError && err.message === "Failed to fetch") {
			return rejectWithValue(
				"Unable to connect to the server. Please try again later."
			);
		}
		console.log("Get events error", err);
		return rejectWithValue(err.message);
	}
});

export const postGiftEvent = createAsyncThunk<
	Event,
	CreateEventRequest,
	{ rejectValue: string }
>("giftEvents/postGiftEvent", async (newEvent, { rejectWithValue }) => {
	try {
		const response = await fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEvent),
		});

		const responseData = await response.json();

		if (!response.ok || !responseData.success) {
			const message = responseData.message || "Failed to add event";
			return rejectWithValue(message);
		}
		return responseData.data;
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

const giftEventsSlice = createSlice({
	name: "giftEvents",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getGiftEvents.pending, (state) => {
				state.getGiftEventsStatus = "loading";
			})
			.addCase(getGiftEvents.fulfilled, (state, action) => {
				state.getGiftEventsStatus = "succeeded";
				state.list = action.payload;
			})
			.addCase(getGiftEvents.rejected, (state, action) => {
				state.getGiftEventsStatus = "failed";
			})
			.addCase(postGiftEvent.pending, (state) => {
				state.postGiftEventStatus = "loading";
			})
			.addCase(postGiftEvent.fulfilled, (state, action) => {
				state.postGiftEventStatus = "succeeded";
				state.list.push(action.payload);
				console.log(action.payload);
			})
			.addCase(postGiftEvent.rejected, (state, action) => {
				state.postGiftEventStatus = "failed";
				state.postGiftEventError = action.payload;
			});
	},
});

export const selectAllGiftEvents = (state: RootState) => state.giftEvents.list;

export const selectGiftEventsStatus = (state: RootState) =>
	state.giftEvents.getGiftEventsStatus;

export const selectGiftEventById = (state: RootState, eventId: number) => {
	return state.giftEvents.list.find((giftEvent) => giftEvent.id === eventId);
};

export default giftEventsSlice.reducer;
