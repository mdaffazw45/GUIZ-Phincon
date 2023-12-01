import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { updateProfileApi } from '@domain/api';

import toast from 'react-hot-toast';

import { UPDATE_PROFILE } from './constants';
import { updateProfileSuccess } from './action';

export function* updateProfile(action) {
  yield put(setLoading(true));
  try {
    const { data, token, cbSucces } = action.payload;
    const response = yield call(updateProfileApi, data, token);
    toast.success(response.message);
    yield put(updateProfileSuccess(response.data));
    cbSucces && cbSucces(response.data);
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* updateProfileSaga() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}
