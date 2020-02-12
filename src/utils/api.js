import axios from 'axios';

export function get(url, params) {
  if(!params) {
    return axios.get(url);
  }
  let paramsStr = '';
  Object.keys(params).forEach(key => {
    const value = params[key];
    if(value instanceof Array) {
      value.forEach(item => paramsStr += `${key}=${item}&`)
    }else {
      paramsStr += `${key}=${value}&`;
    }
  });
  return axios.get(`${url}?${paramsStr}`);
}

export function post(url, body, params) {
  return axios.post(url, body, {params});
}

const basic = 'https://czr-api.vipdesk.cn/api/';
// const basic = 'http://localhost:8181/api/';

export const API_GET_HOSPITALS = `${basic}hospitals`;

export const API_GET_HOSPITAL_BY_ID = id => `${basic}hospitals/${id}`;

export const API_GET_SUPPLIES = `${basic}supplies`;

export const API_GET_NEARBYHOSPITALS = `${basic}findNearbyHospitals`;

export const API_GET_TOTALDEMANDS = `${basic}getTotalDemands`;
