import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { getAllQuizzesApi } from '@domain/api';
import { setAllQuizzes } from './actions';
import { GET_ALL_QUIZZES } from './constants';

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

export default function* homeSaga() {
  yield takeLatest(GET_ALL_QUIZZES, doGetAllQuizzes);
}
