import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { IUser, IStudy, IModal } from "@typings/db";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./UserSlice";
import axios from "axios";
import { backUrl } from "../../config/config";
import { routerReducer } from "connected-next-router";
import studySlice from "./StudySlice";
import ModalSlice from "./ModalSlice";
axios.defaults.baseURL = `${backUrl}`; // baseurl 설정 앞으로 요청할때
export interface State {
  users: IUser;
  study: IStudy;
  modal: IModal;
}
export const rootReducer = combineReducers({
  users: userSlice,
  study: studySlice,
  modal: ModalSlice,
  router: routerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      if (typeof window !== "undefined" && state?.router) {
        nextState.router = state.router;
      }
      return nextState;
    } else {
      return rootReducer(state, action);
    }
  }
};
