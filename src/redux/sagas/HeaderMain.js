import { takeLatest, put } from "redux-saga/effects";
import {
  getUserProfileError,
  getUserProfileSuccess,
} from "../actions/HeaderMain";
import { GET_USER_PROFILE } from "../constants/HeaderMain";

function* getUserProfileSaga() {
  try {
    yield put(getUserProfileSuccess());
  } catch (e) {
    yield put(getUserProfileError(e.message));
  }
}

export default function* getUserProfileWathcer() {
  yield takeLatest(GET_USER_PROFILE, getUserProfileSaga);
}
