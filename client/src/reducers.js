import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';
import homeReducer from '@pages/Home/reducer';
import quizReducer from '@pages/EditQuiz/reducer';
import createQuizReducer from '@pages/CreateQuiz/reducer';
import quizMapReducer , {storedKey as storedQuizState } from '@pages/Map/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  quizMap: {reducer: quizMapReducer , whitelist:storedQuizState}
};

const temporaryReducers = {
  language: languageReducer,
  home: homeReducer,
  quiz: quizReducer,
  createQuiz: createQuizReducer,
  
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
