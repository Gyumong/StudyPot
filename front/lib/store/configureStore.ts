import { configureStore, getDefaultMiddleware, EnhancedStore, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { Action, AnyAction } from "redux";
import { reducer } from "../slices";

export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware()],
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore = (context) => setupStore(context);
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
