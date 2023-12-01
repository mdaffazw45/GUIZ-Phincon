import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfileState = (state) => state.profile || initialState;

export const selectAuthor = createSelector(selectProfileState, (state) => state.author);
export const selectHistory = createSelector(selectProfileState, (state) => state.history);
