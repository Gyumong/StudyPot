import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backUrl } from "../../config/config";
import { IUser } from "@typings/db";

interface signUpPayload {
  categories: any;
  email: string;
  password: string;
  name: string;
}

interface rejectMessage {
  errorMessage: string;
}

const initialState: IUser = {
  user: {
    name: "",
    image: "",
    location: "",
    categories: [
      {
        key: "",
        value: "",
      },
    ],
  },
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signUpUser = createAsyncThunk<IUser, signUpPayload, { rejectValue: rejectMessage }>(
  "users/signupUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${backUrl}`, data);
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue({
        errorMessage: "회원 가입에 실패했습니다.",
      });
    }
  },
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isError = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    });
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: IUser) => {
  return state.user;
};

export default userSlice.reducer;
