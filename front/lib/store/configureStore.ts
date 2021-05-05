import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../slices";
import createSagaMiddleware, { Task } from "redux-saga";
import rootSaga from "../sagas";
import { Store } from "redux";

interface SagaStore extends Store {
  sagaTask?: Task;
}

const store = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({ reducer: rootReducer, middleware: [sagaMiddleware, ...getDefaultMiddleware()] });
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
