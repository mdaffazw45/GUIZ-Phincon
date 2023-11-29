import { call, put, takeEvery } from 'redux-saga/effects';
import { getQuizByIdApi } from '@domain/api';
import { FETCH_QUIZ_BY_ID_REQUEST } from './constants';
import { fetchQuizSuccess, fetchQuizFailure } from './actions';

function* fetchQuizSaga(action) {
  try {
    console.log(action , 'action fetch by id ')
    const quiz = yield call(getQuizByIdApi, action.payload);
    console.log(quiz , 'Hasil Quiz nya')
    yield put(fetchQuizSuccess(quiz));
  } catch (error) {
    yield put(fetchQuizFailure(error.toString()));
  }
}

export default function* quizMapSaga() {
  yield takeEvery(FETCH_QUIZ_BY_ID_REQUEST, fetchQuizSaga);
}
