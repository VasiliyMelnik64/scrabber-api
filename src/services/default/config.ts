import 'dotenv/config';

export const defaultConfig = {
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'appllication/json',
  },
};
