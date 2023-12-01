import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const endpoints = {
  ping: 'ping.json',
  auth: 'auth',
  user: 'user',
  quiz: 'quiz',
  quizTaker: 'taker',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(endpoints.ping, 'get');

export const loginApi = (user) => callAPI(`${endpoints.auth}/login`, 'POST', {}, {}, user);
export const registerApi = (user) => callAPI(`${endpoints.auth}/register`, 'POST', {}, {}, user);
export const forgotPasswordApi = (data) => callAPI(`${endpoints.auth}/forgot-password`, 'POST', {}, {}, data);
export const changePasswordApi = (data, token) =>
  callAPI(`${endpoints.user}/change-password`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);

export const getAllUserApi = () => callAPI(`${endpoints.user}/all`, 'GET');
export const getUserByIdApi = (token) => callAPI(endpoints.user, 'GET', { Authorization: `Bearer ${token}` });
export const getUserByUsernameApi = (username, token) =>
  callAPI(`${endpoints.user}/by/${username}`, 'GET', { Authorization: `Bearer ${token}` });
export const updateProfileApi = (data, token) =>
  callAPI(`${endpoints.user}/profile`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);
export const deleteUserByIdApi = (userId, token) =>
  callAPI(`${endpoints.user}/delete/${userId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const getAllQuizzesApi = () => callAPI(`${endpoints.quiz}/all`, 'GET');
export const getQuizByIdApi = (quizId) => callAPI(`${endpoints.quiz}/${quizId}`, 'GET');
export const createQuizApi = (data, token) =>
  callAPI(`${endpoints.quiz}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const editQuizApi = (quizId, data, token) =>
  callAPI(`${endpoints.quiz}/edit/${quizId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);
export const deleteQuizByIdApi = (quizId, token) =>
  callAPI(`${endpoints.quiz}/delete/${quizId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const finishQuizApi = (quizId, data, token) =>
  callAPI(`${endpoints.quizTaker}/finish/${quizId}`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const getAllUsersTotalScoresApi = (token) =>
  callAPI(`${endpoints.quizTaker}/all/score`, 'GET', { Authorization: `Bearer ${token}` });
  export const getHistoryByUserApi = (token) =>
  callAPI(`${endpoints.quizTaker}`, 'GET', { Authorization: `Bearer ${token}` });