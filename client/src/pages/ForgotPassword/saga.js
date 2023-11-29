import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import toast from 'react-hot-toast';

import { forgotPasswordApi } from '@domain/api';
import { FORGOT_REQUEST } from './constants';

function* forgotPassword(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(forgotPasswordApi, action.payload);
    toast.success(response.message);
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* forgotSaga() {
  yield takeLatest(FORGOT_REQUEST, forgotPassword);
}
