import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { editQuizApi } from '@domain/api';
import toast from 'react-hot-toast';
import { actionSuccess } from '@pages/CreateQuiz/actions';
import { EDIT_QUIZ_BY_ID } from './constants';

export function* doEditQuizById(action) {
  yield put(setLoading(true));
  try {
    const { quizId, data, token } = action.payload;
    const response = yield call(editQuizApi, quizId, data, token);
    yield put(actionSuccess(quizId));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* editQuizSaga() {
  yield takeLatest(EDIT_QUIZ_BY_ID, doEditQuizById);
}
