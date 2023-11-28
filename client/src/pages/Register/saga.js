import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import { REGISTER_REQUEST } from '@containers/Client/constants';
import { registerApi } from '@domain/api';
// import { registerSuccess } from '@containers/Client/actions';

function* handleRegister(action) {
  yield put(setLoading(true));
  try {
    yield call(registerApi, action.payload);
    // yield put(registerSuccess());
    toast.success('Successfully Registered Account');
    window.location.href = '/login';
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Unexpected error occured');
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function* registerSaga() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
