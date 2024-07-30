import axios from 'axios';
const API_URL = 'http://localhost:5173/find-jobs';
export const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});
