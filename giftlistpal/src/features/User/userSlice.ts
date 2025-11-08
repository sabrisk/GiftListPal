import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import { User, patchUserRequest } from "@/types/user";

interface UserState {
	user: User | null;
	getUserStatus: "idle" | "loading" | "succeeded" | "failed";
	patchUserStatus: "idle" | "loading" | "succeeded" | "failed";
	patchUserError?: string | null;
}

const initialState: UserState = {
	user: null,
	getUserStatus: "idle",
	patchUserStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	patchUserError: null,
};

export const getUser = createAsyncThunk<User, string, { rejectValue: string }>(
	"user/getUser",
	async (userId, { rejectWithValue }) => {
		try {
			const response = await fetch(`/api/user/${userId}`);
			const responseData = await response.json();

			if (!response.ok || !responseData.success) {
				const message =
					responseData.message || "Failed to retrieve user";
				return rejectWithValue(message);
			}
			return responseData.data;
		} catch (err: any) {
			if (err instanceof TypeError && err.message === "Failed to fetch") {
				return rejectWithValue(
					"Unable to connect to the server. Please try again later."
				);
			}
			console.log("Get user error", err);
			return rejectWithValue(err.message);
		}
	}
);

export const patchUser = createAsyncThunk<
	User,
	patchUserRequest,
	{ rejectValue: string }
>("user/patchUser", async (updatedUser, { rejectWithValue }) => {
	try {
		const response = await fetch(`/api/user/${updatedUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		});

		const responseData = await response.json();

		if (!response.ok || !responseData.success) {
			const message = responseData.message || "Failed to update user";
			return rejectWithValue(message);
		}
		return responseData.data;
	} catch (err: any) {
		if (err instanceof TypeError && err.message === "Failed to fetch") {
			return rejectWithValue(
				"Unable to connect to the server. Please try again later."
			);
		}

		console.error("patchUser error:", err);
		return rejectWithValue(err.message);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state) => {
				state.getUserStatus = "loading";
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.getUserStatus = "succeeded";
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.getUserStatus = "failed";
			})
			.addCase(patchUser.pending, (state) => {
				state.patchUserStatus = "loading";
			})
			.addCase(patchUser.fulfilled, (state, action) => {
				state.patchUserStatus = "succeeded";
				state.user = action.payload;
				console.log(action.payload);
			})
			.addCase(patchUser.rejected, (state, action) => {
				state.patchUserStatus = "failed";
				state.patchUserError = action.payload;
			});
	},
});

export const selectUser = (state: RootState) => state.user.user;

export const selectUserStatus = (state: RootState) => state.user.getUserStatus;

export default userSlice.reducer;
