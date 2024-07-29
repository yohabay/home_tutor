import axios from 'axios';
const API_URL = 'https://home-tutor-backend.onrender.com';
export const API = axios.create({
  baseURL: API_URL,
  responseType: 'json',
});
