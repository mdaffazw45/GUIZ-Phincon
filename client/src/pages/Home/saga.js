import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { deleteQuizByIdApi, getAllQuizzesApi } from '@domain/api';
import { deleteQuizSuccess, setAllQuizzes } from './actions';
import { DELETE_QUIZ, GET_ALL_QUIZZES } from './constants';

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

export default function* homeSaga() {
  yield takeLatest(GET_ALL_QUIZZES, doGetAllQuizzes);
  yield takeLatest(DELETE_QUIZ, doDeleteQuiz);
}
