import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { deleteQuizByIdApi, getAllQuizzesApi, getAllUserApi } from '@domain/api';
import { deleteQuizSuccess, setAllQuizzes, setUser } from './actions';
import { DELETE_QUIZ, GET_ALL_QUIZZES, GET_USER } from './constants';

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
    // console.log(err);
    toast.error(err.response.data.error);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_QUIZZES, doGetAllQuizzes);
  yield takeLatest(DELETE_QUIZ, doDeleteQuiz);
  yield takeLatest(GET_USER, getAllUser);
}
