import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import toast from 'react-hot-toast';

import { changePasswordApi } from '@domain/api';
import { CHANGE_REQUEST } from './constants';

function* changePassword(action) {
  yield put(setLoading(true));
  try {
    const { data, token } = action.payload;
    const response = yield call(changePasswordApi, data, token);
    toast.success(response.message);
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* changeSaga() {
  yield takeLatest(CHANGE_REQUEST, changePassword);
}
