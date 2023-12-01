import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectQuizzes = createSelector(selectHomeState, (state) => state.quizzes);
export const selectAllUser = createSelector(selectHomeState, (state) => state.allUser);
