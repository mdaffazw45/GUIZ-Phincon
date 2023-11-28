import { produce } from 'immer';

import { REGISTER_SUCCESS, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  role: null,
  user: null,
};

export const storedKey = ['token', 'login', 'role'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        draft.role = action.role;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case REGISTER_SUCCESS:
        draft.user = action.user;
        break;
      default:
        return state;
    }
  });

export default clientReducer;
