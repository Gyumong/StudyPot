import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./UserSlice";
import axios from "axios";
import { backUrl } from "../../config/config";
axios.defaults.baseURL = `${backUrl}`; // baseurl 설정 앞으로 요청할때
export interface State {
  users: IUser;
}
export const rootReducer = combineReducers({
  users: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};
