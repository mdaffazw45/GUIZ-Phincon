import { produce } from 'immer';

import {
  DELETE_USER_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER_BY_ID,
} from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  role: null,
  user: null,
  data: null,
};

export const storedKey = ['token', 'login', 'role', 'user'];

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
        draft.data = action.data;
        break;
      case SET_USER_BY_ID:
        draft.user = action.payload;
        break;
      case DELETE_USER_SUCCESS:
        draft.allUser = draft.allUser.filter((aUser) => aUser.id !== action.payload);
        break;
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  });

export default clientReducer;
