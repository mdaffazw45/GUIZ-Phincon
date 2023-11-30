import { CHANGE_REQUEST } from './constants';

export const changeRequest = (data, token) => ({
  type: CHANGE_REQUEST,
  payload: { data, token },
});
