import { Base64, Environment, IConfig, PrefixedHex } from './types';
import { LOCAL_CONFIG, PROD_CONFIG, STAGING_CONFIG } from './const';

export const base64ToPrefixedHex = (value: Base64): PrefixedHex => {
  return `0x${Buffer.from(value, 'base64').toString('hex')}`;
};

export const prefixedHexToBase64 = (value: PrefixedHex): Base64 => {
  return Buffer.from(value.substr(2), 'hex').toString('base64');
};

const configsMap: Record<Environment, IConfig> = {
  'local': LOCAL_CONFIG,
  'prod': PROD_CONFIG,
  'staging': STAGING_CONFIG,
};

export const configFromEnv = (env: Environment): IConfig => {
  const config = configsMap[env];

  if (!config) {
    throw new Error(`There is no config for env (${env})`);
  }

  return config;
};