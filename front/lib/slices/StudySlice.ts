import { backUrl } from "../../config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithToken from "@utils/axios";
import axios, { AxiosRequestConfig } from "axios";

interface rejectMessage {
  errorMessage: string;
}
interface categoriestype {
  map(arg0: (v: any) => any): any;
  key: string;
  value: string;
}
export interface contentArray {
  id: number;
  thumbnail: string;
  categories: categoriestype;
  title: string;
  content: string;
  locatedAt: string;
  meetingType: string;
  maxNumber: number;
  participatingNumber: number;
  leaderUserId: number;
}

interface ILoadStudy {
  contents: Array<contentArray>;
  lastIdOfStudyList: number;
  last: boolean;
}

export interface ILoadOneStudy {
  categories: {
    key: string;
    value: string;
  };
  content: string;
  createdAt: string;
  leader: {
    imageUrl: string;
    name: string;
  };
  maxNumber: number;
  participatingNumber: number;
  thumbnail: string;
  title: string;
}

interface ILoadOneStudyPayload {
  studyId: number;
}

interface ILoadStudyPayload extends AxiosRequestConfig {
  size?: number | null;
  lastId?: number | null;
  categoryName?: string | null;
}

interface IMakeStudy {
  formData: FormData;
}

interface StudyInitialType {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  study: Array<contentArray>;
  filterCategory: string;
  lastIdOfStudyList: number;
  selected: boolean;
  last: boolean;
  singleStudy: ILoadOneStudy | null;
  joinStudyLoading: boolean;
  joinStudySuccess: boolean;
  joinStudyError: boolean;
  selectedCategory: string;
  filteredStudy: Array<contentArray>;
}

const initialState: StudyInitialType = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  joinStudyLoading: false,
  joinStudySuccess: false,
  joinStudyError: false,
  errorMessage: "",
  filterCategory: "",
  selectedCategory: "",
  study: [],
  selected: false,
  filteredStudy: [],
  lastIdOfStudyList: 0,
  last: false,
  singleStudy: null,
};

// export const JoinStudy = createAsyncThunk("study/JoinStudy", async (data, thunkAPI) => {
//   try {
//     const response = await axiosWithToken.post(`/study/${data.studyId}`);
//     return response.data;
//   } catch (e) {
//     console.log("스터디 가입 에러", e);
//     return thunkAPI.rejectWithValue({
//       errorMessage: "스터디 조인에 실패했습니다.",
//     });
//   }
// });

export const LoadOneStudy = createAsyncThunk<
  ILoadOneStudy,
  ILoadOneStudyPayload | undefined,
  { rejectValue: rejectMessage }
>("study/LoadOneStudy", async (data, thunkAPI) => {
  try {
    const response = await axios.get(`${backUrl}/study/${data?.studyId}`);
    return response.data;
  } catch (e) {
    console.log("Error", e);
    return thunkAPI.rejectWithValue({
      errorMessage: "스터디 불러오기에 실패했습니다.",
    });
  }
});

// ${data?.categoryName ? `&categoryName=${data?.categoryName}` : ""}

export const LoadStudy = createAsyncThunk<ILoadStudy, ILoadStudyPayload | undefined, { rejectValue: rejectMessage }>(
  "study/LoadStudy",
  async (data, thunkAPI) => {
    try {
      const query = data?.categoryName === "" ? "" : `&categoryName=${data?.categoryName}`;
      const response = await axios.get(
        `${backUrl}/study?size=3${query}${data?.lastId ? `&lastId=${data?.lastId}` : ""}`,
      );

      return response.data;
    } catch (e) {
      console.log("Error", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "스터디 불러오기에 실패했습니다.",
      });
    }
  },
);
export const MakeStudy = createAsyncThunk<IMakeStudy, FormData, { rejectValue: rejectMessage }>(
  "study/MakeStudy",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      const response = await axiosWithToken.post(`${backUrl}/study`, formData, {
        // headers: {
        //   "Content-Type": `multipart/form-data`,
        // },
      });
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
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;

      return state;
    },
    filterCategory: (state, action) => {
      console.log(action.payload);
      console.log(state.study);
      state.selectedCategory = action.payload;
      state.selected = true;
      if (state.last) state.last = false;
    },
    resetStudy: (state) => {
      state.selectedCategory = "";
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
    builder.addCase(LoadStudy.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(LoadStudy.fulfilled, (state, { payload }) => {
      const Chocie = state.selectedCategory === "" ? null : state.selectedCategory;
      const current = state.selected;
      if (Chocie && current) {
        state.study = [];
        state.selected = false;
        console.log("change");
      }
      state.study = state.study.concat(payload.contents);

      state.last = payload.last;
      state.lastIdOfStudyList = payload.lastIdOfStudyList;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(LoadStudy.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
    builder.addCase(LoadOneStudy.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(LoadOneStudy.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.singleStudy = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(LoadOneStudy.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload;
    });
    builder.addCase(JoinStudy.pending, (state) => {
      state.joinStudyLoading = true;
    });
    builder.addCase(JoinStudy.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.joinStudyLoading = false;
      state.joinStudySuccess = true;
      state.joinStudyError = false;
    });
    builder.addCase(JoinStudy.rejected, (state) => {
      state.joinStudyLoading = false;
      state.joinStudyError = true;
      state.joinStudySuccess = false;
    });
  },
});

export const { clearState, filterCategory, resetStudy } = studySlice.actions;

export default studySlice.reducer;
