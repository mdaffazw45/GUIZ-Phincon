import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import toast from 'react-hot-toast';

import { getUserByUsernameApi , getHistoryByUserApi } from '@domain/api';
import { GET_HISTORY_BY_USERNAME, GET_USER_BY_USERNAME , SET_HISTORY_BY_USERNAME } from './constants';
import { setUserByUsername , setHistoryByUser} from './action';

export function* getUserByUsername(action) {
  yield put(setLoading(true));
  try {
    const { username, token } = action;
    const response = yield call(getUserByUsernameApi, username, token);
    yield put(setUserByUsername(response.user));
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* getHistoryByUsername(action) {
  yield put(setLoading(true));
  try {
    const { history, token } = action;
    const response = yield call(getHistoryByUserApi, history, token);
    console.log(response)
    yield put(setHistoryByUser(response));
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* profileSaga() {
  yield takeLatest(GET_USER_BY_USERNAME, getUserByUsername);
  yield takeLatest(GET_HISTORY_BY_USERNAME, getHistoryByUsername);
}
