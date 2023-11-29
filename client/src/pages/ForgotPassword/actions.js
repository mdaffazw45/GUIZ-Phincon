import { FORGOT_REQUEST } from './constants';

export const forgotRequest = (data) => ({
  type: FORGOT_REQUEST,
  payload: data,
});
