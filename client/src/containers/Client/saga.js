import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import { GET_USER_BY_ID, LOGIN_REQUEST, REGISTER_REQUEST, SET_LOGIN } from '@containers/Client/constants';
import { setToken, setUserById } from '@containers/Client/actions';
import { getUserByIdApi, loginApi, registerApi } from '@domain/api';

function* handleRegister(action) {
  yield put(setLoading(true));
  try {
    yield call(registerApi, action.payload);
    toast.success('Successfully Registered Account');
    // yield put(registerSuccess(response));
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

function* handleLogin({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, data);
    yield put(setToken(response.token));
    yield put({ type: SET_LOGIN, login: true, role: response.role });
    toast.success('Logged In Successfully');
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* getUserById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getUserByIdApi, action.token);
    yield put(setUserById(response));
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* clientSaga() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(GET_USER_BY_ID, getUserById);
}
