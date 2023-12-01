import { produce } from 'immer';
import { SET_USER_BY_USERNAME  , SET_HISTORY_BY_USERNAME } from './constants';

export const initialState = {
  author: null,
  history: []
};

export const storedKey = [];

const profileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER_BY_USERNAME:
        draft.author = action.payload.user;
        break;
      case SET_HISTORY_BY_USERNAME:
        draft.history = action.history;
        break;
    }
  });

export default profileReducer;
