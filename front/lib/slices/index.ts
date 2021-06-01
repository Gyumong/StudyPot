import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import { HYDRATE } from "next-redux-wrapper";
import userSlice from "./UserSlice";

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
