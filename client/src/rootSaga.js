import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import loginSaga from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';
import createQuizSaga from '@pages/CreateQuiz/saga';

export default function* rootSaga() {
  yield all([appSaga(), homeSaga(), loginSaga(), registerSaga(), createQuizSaga()]);
}
