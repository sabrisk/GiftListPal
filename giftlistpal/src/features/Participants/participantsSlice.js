import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	list: [],
	getParticipantsStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const getParticipants = createAsyncThunk(
	"participants/getParticipants",
	async (id) => {
		try {
			const response = await fetch(`/api/events/${id}/participants`);
			const data = await response.json();
			return data;
		} catch (err) {
			throw new Error(err.message);
		}
	}
);

const participantsSlice = createSlice({
	name: "participants",
	initialState,
	reducers: {
		resetParticipants: (state) => {
			state.list = [];
			state.getParticipantsStatus = "idle";
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getParticipants.pending, (state, action) => {
				state.getParticipantsStatus = "loading";
			})
			.addCase(getParticipants.fulfilled, (state, action) => {
				state.getParticipantsStatus = "succeeded";
				state.list = action.payload;
			})
			.addCase(getParticipants.rejected, (state, action) => {
				state.getParticipantsStatus = "failed";
				state.getParticipantsError = action.error.message;
			});
	},
});

export const selectAllParticipants = (state) => state.participants.list;

export const selectParticipantsStatus = (state) =>
	state.participants.getParticipantsStatus;
export const { resetParticipants } = participantsSlice.actions;

export default participantsSlice.reducer;
