import { getAllUsersTotalScoresApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { setAllUsersTotalScores } from './actions';
import { GET_ALL_USERS_TOTAL_SCORE } from './constants';

export function* doGetAllUsersTotalScore() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllUsersTotalScoresApi);
    yield put(setAllUsersTotalScores(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* leaderboardSaga() {
  yield takeLatest(GET_ALL_USERS_TOTAL_SCORE, doGetAllUsersTotalScore);
}
