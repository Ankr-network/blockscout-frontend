import { AvailableReadProviders } from '@ankr.com/provider';
import { Environment } from 'multirpc-sdk';

export const API_ENV: Environment =
  (process.env.REACT_APP_API_ENV as Environment) ?? 'staging';

export const getReadProviderId = (env: Environment) => {
  if (env === 'prod') {
    return AvailableReadProviders.ethMainnet;
  }

  return AvailableReadProviders.ethGoerli;
};
