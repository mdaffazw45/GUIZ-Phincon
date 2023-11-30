import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProfileState = (state) => state.profile || initialState;

export const selectUsername = createSelector(selectProfileState, (state) => state.username);
