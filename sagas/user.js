import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

// api

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function signUpAPI(data) {
  return axios.post('/api/signup', data);
}

function followAPI(data) {
  return axios.post('/api/follow', data);
}
function unfollowAPI(data) {
  return axios.post('/api/unfollow', data);
}

// action

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* wathchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* wathchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* wathchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

// saga

function* logIn(action) {
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp() {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* follow(action) {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollow(action  ) {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(wathchSignUp), fork(wathchFollow), fork(wathchUnfollow)]);
}
