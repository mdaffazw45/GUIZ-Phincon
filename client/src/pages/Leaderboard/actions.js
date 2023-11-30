import { GET_ALL_USERS_TOTAL_SCORE, SET_ALL_USERS_TOTAL_SCORE } from './constants';

export const getAllUsersTotalScore = () => ({
  type: GET_ALL_USERS_TOTAL_SCORE,
});

export const setAllUsersTotalScores = (usersWithTotalScore) => ({
  type: SET_ALL_USERS_TOTAL_SCORE,
  usersWithTotalScore,
});
