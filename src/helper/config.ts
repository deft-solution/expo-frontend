import getConfig from 'next/config';

export const API_URL = (): string => {
  const {
    publicRuntimeConfig: { API_URL },
  } = getConfig();
  return API_URL;
};