import { backUrl } from "../../config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithToken from "@utils/axios";
import axios, { AxiosRequestConfig } from "axios";
import { AppDispatch } from "@lib/store/configureStore";
import { RootState } from "../store/configureStore";

interface rejectMessage {
  errorMessage: string;
}
interface categoriestype {
  map(arg0: (v: any) => any): any;
  key: string;
  value: string;
}
export interface contentArray {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map(arg0: (i: any) => any): any;
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
  studyLikeCount: number;
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

interface IJoinStudy {
  joinContent?: string;
  studyId: number;
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
  LoadStudyLoading: boolean;
  LoadStudySuccess: boolean;
  LoadStudyError: boolean;
  joinStudyLoading: boolean;
  joinStudySuccess: boolean;
  joinStudyError: boolean;
  LoadStudyMembersLoading: boolean;
  LoadStudyMembersSuccess: boolean;
  LoadStudyMembersError: boolean;
  LikeStudyLoading: boolean;
  LikeStudySuccess: boolean;
  LikeStudyError: boolean;
  MakeStudyLoading: boolean;
  MakeStudySuccess: boolean;
  MakeStudyError: boolean;
  selectedCategory: string;
  filteredStudy: Array<contentArray>;
  studyMembers: any;
}

const initialState: StudyInitialType = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  MakeStudyLoading: false,
  MakeStudySuccess: false,
  MakeStudyError: false,
  LoadStudyLoading: false,
  LoadStudySuccess: false,
  LoadStudyError: false,
  joinStudyLoading: false,
  joinStudySuccess: false,
  joinStudyError: false,
  LoadStudyMembersLoading: false,
  LoadStudyMembersSuccess: false,
  LoadStudyMembersError: false,
  LikeStudyLoading: false,
  LikeStudySuccess: false,
  LikeStudyError: false,
  errorMessage: "",
  filterCategory: "",
  selectedCategory: "",
  study: [],
  selected: false,
  filteredStudy: [],
  lastIdOfStudyList: 0,
  last: false,
  singleStudy: null,
  studyMembers: null,
};

export const LikeStudy = createAsyncThunk<any, { studyId: number }, { rejectValue: rejectMessage }>(
  "study/LikeStudy",
  async (data, thunkAPI) => {
    try {
      const { studyId } = data;
      const response = await axiosWithToken.post(`/study/${studyId}/like`);
      return response.data;
    } catch (e) {
      console.log("스터디 좋아요가 실패", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "스터디 좋아요가 실패했습니다.",
      });
    }
  },
);
export const LoadStudyMembers = createAsyncThunk<any, any, { rejectValue: rejectMessage }>(
  "study/LoadStudyMembers",
  async (data, thunkAPI) => {
    try {
      const { studyId } = data;
      const response = await axiosWithToken.get(`/study/${studyId}/members`);
      return response.data;
    } catch (e) {
      console.log("스터디 멤버 불러오기가 실패 에러", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "스터디 멤버 불러오기가 실패했습니다.",
      });
    }
  },
);

export const JoinStudy = createAsyncThunk<any, IJoinStudy, { rejectValue: rejectMessage }>(
  "study/JoinStudy",
  async (data, thunkAPI) => {
    try {
      const { studyId } = data;
      const response = await axiosWithToken.post(`/study/${studyId}`, data);
      return response.data;
    } catch (e) {
      console.log("스터디 가입 에러", e);
      return thunkAPI.rejectWithValue({
        errorMessage: "스터디 조인에 실패했습니다.",
      });
    }
  },
);

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

export const LoadStudy = createAsyncThunk<
  ILoadStudy,
  ILoadStudyPayload | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: rejectMessage;
  }
>("study/LoadStudy", async (data, thunkAPI) => {
  try {
    const query = data?.categoryName === "" ? "" : `&categoryName=${data?.categoryName}`;
    const response = await axios.get(
      `${backUrl}/study?size=3${query ? query : ""}${data?.lastId ? `&lastId=${data?.lastId}` : ""}`,
    );

    return response.data;
  } catch (e) {
    console.log("Error", e);
    return thunkAPI.rejectWithValue({
      errorMessage: "스터디 불러오기에 실패했습니다.",
    });
  }
});
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
    clearStudy: (state) => {
      state.study = [];
      state.last = false;
      state.lastIdOfStudyList = 0;
      state.LoadStudyLoading = false;
      state.LoadStudySuccess = false;
      state.LoadStudyError = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(MakeStudy.pending, (state) => {
      state.MakeStudyLoading = true;
    });
    builder.addCase(MakeStudy.fulfilled, (state) => {
      state.MakeStudyLoading = false;
      state.MakeStudySuccess = true;
      state.MakeStudyError = false;
    });
    builder.addCase(MakeStudy.rejected, (state, { payload }: any) => {
      state.MakeStudyLoading = false;
      state.MakeStudyError = true;
      state.MakeStudySuccess = false;
      state.errorMessage = payload;
    });
    builder.addCase(LoadStudy.pending, (state) => {
      state.LoadStudyLoading = true;
    });
    builder.addCase(LoadStudy.fulfilled, (state, { payload }) => {
      const Chocie = state.selectedCategory === "" ? null : state.selectedCategory;
      const current = state.selected;
      if (Chocie && current) {
        state.study = [];
        state.selected = false;
        console.log("change");
      }
      const filteredItems = payload.contents.filter((item) => state.study.some((study) => study.id === item.id));
      console.log(filteredItems);
      if (filteredItems.length < 1) {
        state.study = state.study.concat(payload.contents);
      }
      // const post = state.study.filter((item, index) => state.study.indexOf(item) === index);
      state.last = payload.last;
      state.lastIdOfStudyList = payload.lastIdOfStudyList;
      state.LoadStudyLoading = false;
      state.LoadStudySuccess = true;
      state.LoadStudyError = false;
    });
    builder.addCase(LoadStudy.rejected, (state, { payload }: any) => {
      state.LoadStudyLoading = false;
      state.LoadStudyError = true;
      state.LoadStudySuccess = false;
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
      state.joinStudyLoading = false;
      state.joinStudySuccess = true;
      state.joinStudyError = false;
    });
    builder.addCase(JoinStudy.rejected, (state) => {
      state.joinStudyLoading = false;
      state.joinStudyError = true;
      state.joinStudySuccess = false;
    });
    builder.addCase(LoadStudyMembers.pending, (state) => {
      state.LoadStudyMembersLoading = true;
    });
    builder.addCase(LoadStudyMembers.fulfilled, (state, { payload }) => {
      state.LoadStudyMembersLoading = false;
      state.LoadStudyMembersSuccess = true;
      state.LoadStudyMembersError = false;
      state.studyMembers = payload;
    });
    builder.addCase(LoadStudyMembers.rejected, (state) => {
      state.LoadStudyMembersLoading = false;
      state.LoadStudyMembersError = true;
      state.LoadStudyMembersSuccess = false;
      state.studyMembers = null;
    });
    builder.addCase(LikeStudy.pending, (state) => {
      state.LikeStudyLoading = true;
    });
    builder.addCase(LikeStudy.fulfilled, (state, { payload }) => {
      state.LikeStudyLoading = false;
      state.LikeStudySuccess = true;
      state.LikeStudyError = false;
      console.log(payload);
    });
    builder.addCase(LikeStudy.rejected, (state) => {
      state.LikeStudyLoading = false;
      state.LikeStudyError = true;
      state.LikeStudySuccess = false;
    });
  },
});

export const { clearState, filterCategory, resetStudy, clearStudy } = studySlice.actions;

export default studySlice.reducer;
