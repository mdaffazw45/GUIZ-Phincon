import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import { LOGIN_REQUEST, SET_LOGIN } from '@containers/Client/constants';
import { setToken } from '@containers/Client/actions';
import { loginApi } from '@domain/api';

function* handleLogin(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, action.payload);
    yield put(setToken(response.token));
    yield put({ type: SET_LOGIN, login: true, role: response.role });
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
