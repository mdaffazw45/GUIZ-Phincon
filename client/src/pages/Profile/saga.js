import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import toast from 'react-hot-toast';

import { getUserByUsernameApi } from '@domain/api';
import { GET_USER_BY_USERNAME } from './constants';
import { setUserByUsername } from './action';

export function* getUserByUsername(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserByUsernameApi, action.username);
    yield put(setUserByUsername(response));
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_USER_BY_USERNAME, getUserByUsername);
}
