import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const endpoints = {
  ping: 'ping.json',
  auth: 'auth',
  user: 'user',
  quiz: 'quiz',
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

export const getAllUserApi = () => callAPI(`${endpoints.user}/all`, 'GET');
export const getUserByIdApi = (token) => callAPI(endpoints.user, 'GET', { Authorization: `Bearer ${token}` });
export const deleteUserByIdApi = (userId, token) =>
  callAPI(`${endpoints.user}/delete/${userId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const getAllQuizzesApi = () => callAPI(`${endpoints.quiz}/all`, 'GET');
export const getQuizByIdApi = (quizId) => callAPI(`${endpoints.quiz}/${quizId}`, 'GET');
export const createQuizApi = (data, token) =>
  callAPI(`${endpoints.quiz}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const deleteQuizByIdApi = (quizId, token) =>
  callAPI(`${endpoints.quiz}/delete/${quizId}`, 'DELETE', { Authorization: `Bearer ${token}` });
