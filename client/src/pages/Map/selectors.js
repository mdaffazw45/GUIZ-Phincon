import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectQuizState = (state) => state.quiz || initialState;

export const selectQuiz = createSelector(selectQuizState, (state) => state.quiz);
