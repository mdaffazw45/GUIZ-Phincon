import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getQuizByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { setQuizById } from './actions';
import { GET_QUIZ_BY_ID } from './constants';

export function* doGetQuizById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getQuizByIdApi, action.quizId);
    yield put(setQuizById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* quizSaga() {
  yield takeLatest(GET_QUIZ_BY_ID, doGetQuizById);
}
