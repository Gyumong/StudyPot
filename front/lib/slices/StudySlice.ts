import { backUrl } from "../../config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithToken from "@utils/axios";

interface rejectMessage {
  errorMessage: string;
}

interface IMakeStudy {
  titile: string;
  categories: string[];
  image: string;
  content: string;
  locatedAt: string;
  maxStudyNumber: number;
  meetingType: "ONLINE" | "OFFLINE" | "ON_AND_OFFLINE";
  status: "OPEN" | "CLOSE";
}

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  data: null,
};
export const MakeStudy = createAsyncThunk<IMakeStudy, IMakeStudy, { rejectValue: rejectMessage }>(
  "study/MakeStudy",
  async (data, thunkAPI) => {
    try {
      const response = await axiosWithToken.post(`${backUrl}/study`, data, {});
      return response.data;
    } catch (e) {
      console.log("Error", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "스터디 생성에 실패했습니다.",
      });
    }
  },
);

export const studySlice = createSlice({
  name: "study",
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
    builder.addCase(MakeStudy.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(MakeStudy.fulfilled, (state) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(MakeStudy.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearState } = studySlice.actions;

export default studySlice.reducer;
