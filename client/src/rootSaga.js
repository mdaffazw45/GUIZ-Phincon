import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import createQuizSaga from '@pages/CreateQuiz/saga';
import clientSaga from '@containers/Client/saga';
import quizSaga from '@pages/Map/saga';
import editQuizSaga from '@pages/EditQuiz/saga';
import forgotSaga from '@pages/ForgotPassword/saga';

export default function* rootSaga() {
  yield all([appSaga(), homeSaga(), clientSaga(), createQuizSaga(), quizSaga(), editQuizSaga(), forgotSaga()]);
}
