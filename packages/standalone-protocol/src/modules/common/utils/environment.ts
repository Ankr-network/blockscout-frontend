import { Environment } from 'multirpc-sdk';

export const API_ENV: Environment =
  (process.env.REACT_APP_API_ENV as Environment) ?? 'staging';
