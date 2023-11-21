import axios from 'axios';
const API_URL = 'http:localhost:8800/api-v1';
export const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});
