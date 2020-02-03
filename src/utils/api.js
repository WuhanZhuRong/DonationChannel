import axios from 'axios';

export function get(url, params) {
  return axios.get(url, {params});
}

export function post(url, body, params) {
  return axios.post(url, body, {params});
}

const basic = 'https://czr-api.vipdesk.cn/api/';
// const basic = 'http://localhost:8181/api/';

export const API_GET_HOSPITALS = `${basic}hospitals`;

export const API_GET_HOSPITAL_BY_ID = id => `${basic}hospitals/${id}`;

export const API_GET_SUPPLIES = `${basic}supplies`;
