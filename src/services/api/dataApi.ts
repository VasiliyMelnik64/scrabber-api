import createInstance from './instance';
import { ApplicationError } from '../../utils/Errors';

const API = createInstance();

export const getCommonData = async (config = {}) => {
  try {
    const { data } = await API.get('/', config);

    return data;
  } catch (e) {
    throw ApplicationError.getServerError();
  }
};
