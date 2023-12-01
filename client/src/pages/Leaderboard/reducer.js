import { produce } from 'immer';
import { SET_ALL_USERS_TOTAL_SCORE } from './constants';

export const initialState = {
  usersWithTotalScore: null,
};

const leaderboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_USERS_TOTAL_SCORE:
        draft.usersWithTotalScore = action.usersWithTotalScore;
        break;
    }
  });

export default leaderboardReducer;
