import { configFromEnv } from 'multirpc-sdk';

import { API_ENV } from 'modules/common/utils/environment';

const { REACT_APP_CHAIN_ID } = process.env;

export const getConfig = () => {
  const config = configFromEnv(API_ENV);

  let workerUrl = '/';

  if (!REACT_APP_CHAIN_ID) {
    workerUrl = config.workerUrl;
  }

  return {
    ...config,
    workerUrl,
  };
};
