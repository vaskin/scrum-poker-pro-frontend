import axios from 'axios';

import { API_URL } from '../constants';
import UserService from '../services/UserService';
import * as methods from './methods';

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(async (config) => {
  await UserService.updateToken();

  config.headers.authorization = `Bearer ${UserService.getToken()}`;

  return config;
});

export const API = { ...methods };
