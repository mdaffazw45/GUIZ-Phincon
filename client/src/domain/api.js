import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const endpoints = {
  ping: 'ping.json',
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

export const getAllQuizzesApi = () => callAPI(`${endpoints.quiz}/all`, 'GET');
export const getQuizByIdApi = (quizId) => callAPI(`${endpoints.quiz}/${quizId}`, 'GET');
