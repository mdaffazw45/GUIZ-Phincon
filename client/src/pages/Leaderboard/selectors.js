import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLeaderboardState = (state) => state.leaderboard || initialState;

export const selectUsersWithTotalScore = createSelector(selectLeaderboardState, (state) => state.usersWithTotalScore);
