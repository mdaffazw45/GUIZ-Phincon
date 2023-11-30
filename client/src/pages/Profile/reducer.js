import { produce } from 'immer';
import { SET_USER_BY_USERNAME } from './constants';

export const initialState = {
  username: null,
};

export const storedKey = [];

const profileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER_BY_USERNAME:
        draft.username = action.payload.user;
        break;
    }
  });

export default profileReducer;
