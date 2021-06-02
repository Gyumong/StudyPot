import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "../slices";
import { createRouterMiddleware, initialRouterState } from "connected-next-router";
import Router from "next/router";

export const initStore = (context: any) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [routerMiddleware, ...getDefaultMiddleware()],
  });
};

const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
