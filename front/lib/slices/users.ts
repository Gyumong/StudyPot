import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";

const initialState: IUser = {
  userLoading: false,
  userData: null,
  error: null,
  accessToken: "",
};

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Login
    loginRequest(state: IUser) {
      state.userLoading = true;
      state.error = null;
    },
    loginSuccess(state: IUser, action: PayloadAction<IUser>) {
      state.userLoading = false;
      state.accessToken = action.payload.accessToken;
    },
    loginFailure(state: IUser, action: PayloadAction<{ error: unknown }>) {
      state.userLoading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = users;
export const { loginRequest, loginSuccess, loginFailure } = actions;
export default reducer;
