import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { setLoading } from '@containers/App/actions';
import {
  DELETE_USER,
  GET_USER,
  GET_USER_BY_ID,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_LOGIN,
} from '@containers/Client/constants';
import { deleteUserSuccess, setToken, setUser, setUserById } from '@containers/Client/actions';
import { deleteUserByIdApi, getAllUserApi, getUserByIdApi, loginApi, registerApi } from '@domain/api';

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
    window.location.href = '/';
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* getAllUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllUserApi);
    yield put(setUser(response));
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

function* deleteUser(action) {
  try {
    const response = yield call(deleteUserByIdApi, action.payload.userId, action.payload.token);
    yield put(deleteUserSuccess(action.payload.userId));
    toast.success(response.message);
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export default function* clientSaga() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(GET_USER, getAllUser);
  yield takeLatest(GET_USER_BY_ID, getUserById);
  yield takeLatest(DELETE_USER, deleteUser);
}
