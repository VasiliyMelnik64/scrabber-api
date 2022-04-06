import axios, { AxiosInstance } from 'axios';
import { defaultConfig } from '../default/config';

type ConfigType = {
  [key: string]: any;
};

const createInstance = (config: ConfigType = {}): AxiosInstance => {
  const resConfig = {
    ...defaultConfig,
    ...config,
  };

  const instance = axios.create(resConfig);

  return instance;
};

export default createInstance;
