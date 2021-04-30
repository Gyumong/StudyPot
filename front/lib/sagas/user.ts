import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "../slices/users";
import { LoginRequestPayload, ResponseGenerator } from "@typings/db";

function logInAPI(data: LoginRequestPayload) {
  return axios.post("/auth/login", data);
}

function* logIn(action: PayloadAction<LoginRequestPayload>) {
  // 액션을 받음
  try {
    const result: ResponseGenerator = yield call(logInAPI, action.payload);
    //   const { accessToken } = yield result.data;
    // API 요청 콜마다 헤더에 accessToken을 담아 보내도록 설정
    //   axios.defaults.headers.common["x-access-token"] = yield `${accessToken}`;
    //   console.log(accessToken);

    yield put(loginSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(loginFailure(e.response.data));
  }
}

function* watchLogIn() {
  yield takeLatest(loginRequest.type, logIn);
}

export default function* userSaga() {
  yield all([fork(watchLogIn)]);
}
