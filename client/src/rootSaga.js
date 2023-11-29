import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import createQuizSaga from '@pages/CreateQuiz/saga';
import clientSaga from '@containers/Client/saga';
import quizSaga from '@pages/EditQuiz/saga';
import quizMapSaga from '@pages/Map/saga';

export default function* rootSaga() {
  yield all([appSaga(), homeSaga(), clientSaga(), createQuizSaga(), quizSaga(), quizMapSaga()]);

}