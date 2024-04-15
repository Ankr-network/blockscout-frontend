import { Base64, Environment, IConfig, PrefixedHex, Token } from './types';
import { EBlockchain, PROD_CONFIG, STAGING_CONFIG } from './const';

export const base64ToPrefixedHex = (value: Base64): PrefixedHex => {
  return `0x${Buffer.from(value, 'base64').toString('hex')}`;
};

const configsMap: Record<Environment, IConfig> = {
  prod: PROD_CONFIG,
  staging: STAGING_CONFIG,
};

export const configFromEnv = (env: Environment = 'prod'): IConfig => {
  const config = configsMap[env];

  if (!config) {
    throw new Error(`There is no config for env (${env})`);
  }

  return config;
};

export const createTOTPHeaders = (totp?: string) =>
  totp ? { 'x-ankr-totp-token': totp } : {};


export const getBlochainByChainId = (chainId: number): EBlockchain => {
  switch (chainId) {
    case 42161:
      return EBlockchain.arbitrum;
    case 43114:
      return EBlockchain.avalanche;
    case 8453:
      return EBlockchain.base;
    case 56:
      return EBlockchain.bsc;
    case 250:
      return EBlockchain.fantom;
    case 14:
      return EBlockchain.flare;
    case 100:
      return EBlockchain.gnosis;
    case 59144:
      return EBlockchain.linea;
    case 10:
      return EBlockchain.optimism;
    case 137:
      return EBlockchain.polygon;
    case 1101:
      return EBlockchain.polygon_zkevm;
    case 570:
      return EBlockchain.rollux;
    case 534352:
      return EBlockchain.scroll;
    case 57:
      return EBlockchain.syscoin;
    case 43113:
      return EBlockchain.avalanche_fuji;
    case 5:
      return EBlockchain.eth_goerli;
    case 420:
      return EBlockchain.optimism_testnet;
    case 80001:
      return EBlockchain.polygon_mumbai;

    case 1:
    default:
      return EBlockchain.eth;
  }
}

export const getTokenAddress = (token: Token, env: Environment): string => {
  const config = configFromEnv(env);

  switch (token) {
    case Token.ANKR:
      return config.ankrTokenContractAddress;
    case Token.ETH:
    default:
      return '';
  }
}