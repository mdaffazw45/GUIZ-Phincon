import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const endpoints = {
  name: 'name',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.countries + endpoint,
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

export const fetchCountryData = (countryName) => callAPI(`${endpoints.name}/${countryName}?fullText=true`, 'GET');
