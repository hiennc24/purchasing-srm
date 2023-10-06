import { all } from "redux-saga/effects";
import headerSaga from "./HeaderMain";

export default function* rootSaga() {
  yield all([headerSaga()]);
}