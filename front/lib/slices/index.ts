import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { IUser, IStudy, IModal } from "@typings/db";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./UserSlice";
import axios from "axios";
import { backUrl } from "../../config/config";
import studySlice from "./StudySlice";
import ModalSlice from "./ModalSlice";
import { AppDispatch } from "@lib/store/configureStore";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = `${backUrl}`; // baseurl 설정 앞으로 요청할때

export interface State {
  users: IUser;
  study: IStudy;
  modal: IModal;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const reducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };
    default: {
      return combineReducers({
        users: userSlice,
        study: studySlice,
        modal: ModalSlice,
      })(state, action);
    }
  }
};
