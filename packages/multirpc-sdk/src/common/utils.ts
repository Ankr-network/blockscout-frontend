import { Base64, Environment, IConfig, PrefixedHex } from './types';
import { PROD_CONFIG, STAGING_CONFIG } from './const';

export const base64ToPrefixedHex = (value: Base64): PrefixedHex => {
  return `0x${Buffer.from(value, 'base64').toString('hex')}`;
};

const configsMap: Record<Environment, IConfig> = {
  prod: PROD_CONFIG,
  staging: STAGING_CONFIG,
};

export const configFromEnv = (env: Environment): IConfig => {
  const config = configsMap[env];

  if (!config) {
    throw new Error(`There is no config for env (${env})`);
  }

  return config;
};

export const createTOTPHeaders = (totp?: string) =>
  totp ? { 'x-ankr-totp-token': totp } : {};
