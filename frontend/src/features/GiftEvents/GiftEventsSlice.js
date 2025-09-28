import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import SpaceTravelApi from "../../services/SpaceTravelApi";

const initialState = {
	list: [],
	getGiftEventsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	// getSpacecraftsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	// buildSpacecraftStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	// destroySpacecraftByIdStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	// sendSpacecraftToPlanetStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	// getSpacecraftByIdStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'

	// getSpacecraftsError: null,
	// buildSpacecraftError: null,
	// destroySpacecraftByIdError: null,
	// sendSpacecraftToPlanetError: null,
	// getSpacecraftByIdError: null,
};

export const getGiftEvents = createAsyncThunk(
	"giftEvents/getgiftEvents",
	async () => {
		try {
			const response = await fetch("/api/events");
			const data = await response.json();
			console.log("the data", data);
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
			console.log("the data", data);
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}
);

// export const getSpacecraftById = createAsyncThunk(
// 	"spacecrafts/getSpacecraftById",
// 	async ({ id }) => {
// 		try {
// 			const response = await SpaceTravelApi.getSpacecraftById({ id });
// 			return [...response.data];
// 		} catch (err) {
// 			throw new Error(err.message);
// 		}
// 	}
// );

// export const buildSpacecraft = createAsyncThunk(
// 	"spacecrafts/buildSpacecraft",
// 	async (newSpacecraft, { dispatch }) => {
// 		try {
// 			const response = await SpaceTravelApi.buildSpacecraft(
// 				newSpacecraft
// 			);
// 			await dispatch(getSpacecrafts());
// 			return response;
// 		} catch (err) {
// 			throw new Error(err.message);
// 		}
// 	}
// );

// export const destroySpacecraftById = createAsyncThunk(
// 	"spacecrafts/destroySpacecraftById",
// 	async (id, { dispatch }) => {
// 		try {
// 			const response = await SpaceTravelApi.destroySpacecraftById(id);
// 			await dispatch(getSpacecrafts());
// 			return response;
// 		} catch (err) {
// 			throw new Error(err.message);
// 		}
// 	}
// );

// export const sendSpacecraftToPlanet = createAsyncThunk(
// 	"spacecrafts/sendSpacecraftToPlanet",
// 	async ({ spacecraftId, originPlanetId, targetPlanetId, capacity }) => {
// 		try {
// 			const response = await SpaceTravelApi.sendSpacecraftToPlanet({
// 				spacecraftId,
// 				targetPlanetId,
// 			});
// 			return { spacecraftId, originPlanetId, targetPlanetId, capacity };
// 		} catch (err) {
// 			throw new Error(err.message);
// 		}
// 	}
// );

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
				console.log("action payload", action.payload);
				state.list.push(action.payload);
			})
			.addCase(postGiftEvent.rejected, (state, action) => {
				state.postGiftEventStatus = "failed";
				state.postGiftEventError = action.error.message;
			});

		// 		.addCase(getSpacecraftById.pending, (state, action) => {
		// 			state.getSpacecraftByIdStatus = "loading";
		// 		})
		// 		.addCase(getSpacecraftById.fulfilled, (state, action) => {
		// 			state.getSpacecraftByIdStatus = "succeeded";
		// 			state.list = action.payload;
		// 		})
		// 		.addCase(getSpacecraftById.rejected, (state, action) => {
		// 			state.getSpacecraftByIdStatus = "failed";
		// 			state.getSpacecraftByIdError = action.error.message;
		// 		})

		// 		.addCase(buildSpacecraft.pending, (state, action) => {
		// 			state.buildSpacecraftStatus = "loading";
		// 		})
		// 		.addCase(buildSpacecraft.fulfilled, (state, action) => {
		// 			state.buildSpacecraftStatus = "succeeded";
		// 		})
		// 		.addCase(buildSpacecraft.rejected, (state, action) => {
		// 			state.buildSpacecraftStatus = "failed";
		// 			state.buildSpacecraftError = action.error.message;
		// 		})
		// 		.addCase(destroySpacecraftById.pending, (state, action) => {
		// 			state.destroySpacecraftByIdStatus = "loading";
		// 		})
		// 		.addCase(destroySpacecraftById.fulfilled, (state, action) => {
		// 			state.destroySpacecraftByIdStatus = "succeeded";
		// 		})
		// 		.addCase(destroySpacecraftById.rejected, (state, action) => {
		// 			state.destroySpacecraftByIdStatus = "failed";
		// 			state.destroySpacecraftByIdError = action.error.message;
		// 		})
		// 		.addCase(sendSpacecraftToPlanet.pending, (state, action) => {
		// 			state.sendSpacecraftToPlanetStatus = "loading";
		// 		})
		// 		.addCase(sendSpacecraftToPlanet.fulfilled, (state, action) => {
		// 			state.sendSpacecraftToPlanetStatus = "succeeded";
		// 			const spacecraftToUpdate = state.list.find(
		// 				(craft) => craft.id === action.payload.spacecraftId
		// 			);

		// 			if (spacecraftToUpdate) {
		// 				spacecraftToUpdate.currentLocation =
		// 					action.payload.targetPlanetId;
		// 			}
		// 		})
		// 		.addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
		// 			state.sendSpacecraftToPlanetStatus = "failed";
		// 			state.sendSpacecraftToPlanetError = action.error.message;
		// 		});
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
