import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import homeReducer from '@pages/Home/reducer';
import createQuizReducer from '@pages/CreateQuiz/reducer';
import quizReducer from '@pages/Map/reducer';
import leaderboardReducer from '@pages/Leaderboard/reducer';
import profileReducer from '@pages/Profile/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
};

const temporaryReducers = {
  language: languageReducer,
  home: homeReducer,
  createQuiz: createQuizReducer,
  quiz: quizReducer,
  leaderboard: leaderboardReducer,
  profile:profileReducer
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
