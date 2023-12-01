import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createQuizApi } from '@domain/api';
import toast from 'react-hot-toast';
import { CREATE_QUIZ } from './contants';
import { actionSuccess } from './actions';

function* doCreateQuiz(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createQuizApi, action.payload.data, action.payload.token);
    yield put(actionSuccess(action.payload.quizId));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* createQuizSaga() {
  yield takeLatest(CREATE_QUIZ, doCreateQuiz);
}
