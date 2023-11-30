import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { finishQuizApi, getQuizByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { setQuizById } from './actions';
import { FINISH_QUIZ, GET_QUIZ_BY_ID } from './constants';

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

export function* doFinishQuiz(action) {
  try {
    const { quizId, data, token } = action.payload;
    yield call(finishQuizApi, quizId, data, token);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export default function* quizSaga() {
  yield takeLatest(GET_QUIZ_BY_ID, doGetQuizById);
  yield takeLatest(FINISH_QUIZ, doFinishQuiz);
}
