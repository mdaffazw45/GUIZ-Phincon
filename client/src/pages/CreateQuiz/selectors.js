import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCreateQuizState = (state) => state.createQuiz || initialState;

export const selectActionSuccess = createSelector(selectCreateQuizState, (state) => state.actionSuccess);
