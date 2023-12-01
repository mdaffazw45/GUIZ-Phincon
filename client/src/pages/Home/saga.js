import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { deleteQuizByIdApi, deleteUserByIdApi, getAllQuizzesApi, getAllUserApi } from '@domain/api';
import { deleteQuizSuccess, deleteUserSuccess, setAllQuizzes, setUser } from './actions';
import { DELETE_QUIZ, DELETE_USER, GET_ALL_QUIZZES, GET_ALL_USER } from './constants';

export function* doGetAllQuizzes() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllQuizzesApi);
    yield put(setAllQuizzes(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteQuiz(action) {
  try {
    const response = yield call(deleteQuizByIdApi, action.payload.quizId, action.payload.token);
    yield put(deleteQuizSuccess(action.payload.quizId));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* getAllUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllUserApi);
    yield put(setUser(response));
  } catch (err) {
    toast.error(err.response.data.error);
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

export default function* homeSaga() {
  yield takeLatest(GET_ALL_QUIZZES, doGetAllQuizzes);
  yield takeLatest(DELETE_QUIZ, doDeleteQuiz);
  yield takeLatest(GET_ALL_USER, getAllUser);
  yield takeLatest(DELETE_USER, deleteUser);
}
