import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backUrl } from "../../config/config";
import { IUserProfile, IUser } from "@typings/db";
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
  participatingStudyList: Array<any>;
  interestingStudyList: Array<any>;
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

interface passwordChangePayload {
  changedPassword: string;
  originalPassword: string;
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
    participatingStudyList: [
      {
        studyId: -1,
        studyTitle: "",
        studyContent: "",
      },
    ],
    interestingStudyList: [
      {
        studyId: -1,
        studyTitle: "",
        studyContent: "",
      },
    ],
  },
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  loadUserLoading: false,
  loadUserSuccess: false,
  loadUserError: false,
  signUpLoading: false,
  signUpSuccess: false,
  signUpError: false,
  passwordChangeLoading: false,
  passwordChangeSuccess: false,
  passwordChangeError: false,
  errorMessage: "",
};

export const UpdateUserPassword = createAsyncThunk<null, passwordChangePayload, { rejectValue: rejectMessage }>(
  "users/UpdateUserPassword",
  async (data, thunkAPI) => {
    try {
      const response = await axiosWithToken.put(`/user`, data);
      return response.data;
    } catch (e) {
      console.log("error");
      return thunkAPI.rejectWithValue({
        errorMessage: "비밀번호 변경에 실패했습니다.",
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

export const UpdateUserProfile = createAsyncThunk<IUserProfile, FormData, { rejectValue: rejectMessage }>(
  "users/UpdateUserProfile",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosWithToken.patch(`${backUrl}/user`, formData, {});
      return response.data;
    } catch (e) {
      console.log("Error", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "유저 정보수정에 실패했습니다.",
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
      state.isError = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.signUpLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.signUpLoading = false;
      state.signUpSuccess = true;
      state.signUpError = false;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }: any) => {
      state.signUpLoading = false;
      state.signUpError = true;
      state.signUpSuccess = false;
      state.errorMessage = payload.errorMessage;
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
      state.loadUserLoading = true;
    });
    builder.addCase(loadUserByToken.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.user.name = payload.name;
      state.user.categories = payload.categories;
      state.user.image = payload.image;
      state.user.introduction = payload.introduction;
      state.user.location = payload.location;
      state.user.participatingStudyList = payload.participatingStudyList;
      state.user.interestingStudyList = payload.interestingStudyList;
      state.loadUserLoading = false;
      state.loadUserSuccess = true;
      state.loadUserError = false;
      state.isLoggedIn = true;
    });
    builder.addCase(loadUserByToken.rejected, (state, { payload }: any) => {
      state.loadUserLoading = false;
      state.loadUserError = true;
      state.loadUserSuccess = false;
      state.errorMessage = payload;
      state.isLoggedIn = false;
    });
    builder.addCase(UpdateUserProfile.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(UpdateUserProfile.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(UpdateUserProfile.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
    builder.addCase(UpdateUserPassword.pending, (state) => {
      state.passwordChangeLoading = true;
    });
    builder.addCase(UpdateUserPassword.fulfilled, (state) => {
      state.passwordChangeLoading = false;
      state.passwordChangeSuccess = true;
      state.passwordChangeError = false;
    });
    builder.addCase(UpdateUserPassword.rejected, (state, { payload }: any) => {
      state.passwordChangeLoading = false;
      state.passwordChangeError = true;
      state.passwordChangeSuccess = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearState, logOut } = userSlice.actions;

export const userSelector = (state: IUser) => {
  return state;
};

export default userSlice.reducer;
