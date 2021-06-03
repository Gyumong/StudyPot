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

interface loginPayload {
  email: string;
  password: string;
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
      const response = await axios.post(`${backUrl}/signup`, data);
      return response.data;
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue({
        errorMessage: "회원 가입에 실패했습니다.",
      });
    }
  },
);

export const loginUser = createAsyncThunk<IUser, loginPayload>("users/login", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${backUrl}/login`, data);
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue({
      errorMessage: "로그인에 실패했습니다.",
    });
  }
});

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
      state.isError = false;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: IUser) => {
  return state;
};

export default userSlice.reducer;
