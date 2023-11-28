import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import { LOGIN_REQUEST } from '@containers/Client/constants';
import { setLogin, setToken } from '@containers/Client/actions';
import { loginApi } from '@domain/api';

function* handleLogin(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, action.payload);
    yield put(setToken(response.token));
    yield put(setLogin(response.role));
    yield put(setLogin(true));
    toast.success('Logged In Successfully');
    window.location.href = '/';
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
