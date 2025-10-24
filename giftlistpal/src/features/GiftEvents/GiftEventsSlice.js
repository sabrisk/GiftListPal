import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	list: [],
	getGiftEventsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const getGiftEvents = createAsyncThunk(
	"giftEvents/getgiftEvents",
	async () => {
		try {
			const response = await fetch("/api/events");
			const data = await response.json();
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}
);

export const postGiftEvent = createAsyncThunk(
	"giftEvents/postGiftEvent",
	async (newEvent) => {
		try {
			const response = await fetch("/api/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEvent),
			});

			if (!response.ok) {
				throw new Error("Failed to add event");
			}

			const data = await response.json();
			console.log("thunk event post", data);
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}
);

const giftEventsSlice = createSlice({
	name: "giftEvents",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(getGiftEvents.pending, (state, action) => {
				state.getGiftEventsStatus = "loading";
			})
			.addCase(getGiftEvents.fulfilled, (state, action) => {
				state.getGiftEventsStatus = "succeeded";
				state.list = action.payload;
			})
			.addCase(getGiftEvents.rejected, (state, action) => {
				state.getGiftEventsStatus = "failed";
				state.getGiftEventsError = action.error.message;
			})
			.addCase(postGiftEvent.pending, (state, action) => {
				state.postGiftEventStatus = "loading";
			})
			.addCase(postGiftEvent.fulfilled, (state, action) => {
				console.log("made it to postGiftEvent success");
				state.postGiftEventStatus = "succeeded";
				state.list.push(action.payload);
				console.log(action.payload.message);
			})
			.addCase(postGiftEvent.rejected, (state, action) => {
				state.postGiftEventStatus = "failed";
				state.postGiftEventError = action.error.message;
			});
	},
});

export const selectAllGiftEvents = (state) => state.giftEvents.list;

export const selectGiftEventsStatus = (state) =>
	state.giftEvents.getGiftEventsStatus;

export const selectGiftEventById = (state, eventId) => {
	return state.giftEvents.list.find(
		(giftEvent) => giftEvent.id === parseInt(eventId)
	);
};

// export const selectSpacecraftsStatus = (state) =>
// 	state.spacecrafts.getSpacecraftsStatus;
// export const selectSpacecraftsError = (state) =>
// 	state.spacecrafts.getSpacecraftsError;

// export const selectSpacecraftStatus = (state) =>
// 	state.spacecrafts.buildSpacecraftStatus;
// export const selectSpacecraftError = (state) =>
// 	state.spacecrafts.buildSpacecraftError;

// export const selectDestroySpacecraftByIdStatus = (state) =>
// 	state.spacecrafts.destroySpacecraftByIdStatus;
// export const selectDestroySpacecraftByIdError = (state) =>
// 	state.spacecrafts.destroySpacecraftByIdError;

// export const selectSendSpacecraftToPlanetStatus = (state) =>
// 	state.spacecrafts.sendSpacecraftToPlanetStatus;
// export const selectSendSpacecraftToPlanetError = (state) =>
// 	state.spacecrafts.sendSpacecraftToPlanetError;

export default giftEventsSlice.reducer;
