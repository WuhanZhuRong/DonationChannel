import axios from 'axios';

export function get(url, params) {
  return axios.get(url, {params});
}

export function post(url, body, params) {
  return axios.post(url, body, {params});
}

const basic = 'http://czr.vipdesk.cn:8080/zhurong/';
// const basic = 'http://localhost:8181/zhurong/';

export const API_GET_HOSPITALS = `${basic}hospitals`;
export const API_GET_SUPPLIES = `${basic}supplies`;