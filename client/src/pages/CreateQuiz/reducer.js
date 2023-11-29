import { produce } from 'immer';
import { ACTION_SUCCESS, RESET_ACTION_SUCCESS } from './contants';

export const initialState = {
  actionSuccess: false,
};

export const storedKey = [];

const createQuizReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ACTION_SUCCESS:
        draft.actionSuccess = true;
        break;
      case RESET_ACTION_SUCCESS:
        draft.actionSuccess = false;
        break;
    }
  });

export default createQuizReducer;
