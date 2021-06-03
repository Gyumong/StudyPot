import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backUrl } from "../../config/config";
import { IUser } from "@typings/db";
import axiosWithToken from "@utils/axios";

interface Token {
  rejectWithValue: any;
  accessToken?: string;
  refreshToken?: string;
}

interface IloadUser {
  categories: any;
  image: string;
  introduction: string;
  location: string;
  name: string;
  errorMessage: string;
}
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
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const refreshAccessToken = createAsyncThunk<Token, any, { rejectValue: rejectMessage }>(
  "users/refreshAccessToken",
  async (thunkAPI) => {
    try {
      if (localStorage.getItem("refreshToken")) {
        const refreshToken = localStorage.getItem("refreshToken");
        const { accessToken }: { accessToken: string } = await axios.get(`${backUrl}/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        await localStorage.setItem("accessToken", accessToken);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue({
        errorMessage: "쿠키반환에 실패했습니다.",
      });
    }
  },
);

export const loadUserByToken = createAsyncThunk<IloadUser, any, { rejectValue: rejectMessage }>(
  "users/loadUserByToken",
  async (thunkAPI) => {
    try {
      const response = await axiosWithToken.get(`/user`);
      console.log("response", response.data);
      return response.data;
    } catch (e) {
      console.log("error");
      return thunkAPI.rejectWithValue({
        errorMessage: "로그인에 실패했습니다.",
      });
    }
  },
);

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
      await localStorage.setItem("accessToken", accessToken);
      await localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
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
    logOut: (state) => {
      state.isLoggedIn = false;
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
    builder.addCase(loadUserByToken.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loadUserByToken.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.user.name = payload.name;
      state.user.categories = payload.categories;
      state.user.image = payload.image;
      state.user.introduction = payload.introduction;
      state.user.location = payload.location;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
    });
    builder.addCase(loadUserByToken.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
      state.isLoggedIn = false;
    });
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(refreshAccessToken.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearState, logOut } = userSlice.actions;

export const userSelector = (state: IUser) => {
  return state;
};

export default userSlice.reducer;
