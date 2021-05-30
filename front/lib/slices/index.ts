import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import { HYDRATE } from "next-redux-wrapper";
import users from "./users";

export interface State {
  users: IUser;
}
const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        users,
      });
      return combinedReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
