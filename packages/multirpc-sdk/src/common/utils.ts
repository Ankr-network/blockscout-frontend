import { EEthereumNetworkId } from '@ankr.com/provider';

import {
  Base64,
  EBlockchain,
  Environment,
  IConfig,
  PrefixedHex,
  Token,
} from './types';
import { PROD_CONFIG, STAGING_CONFIG } from './const';

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


export const getBlochainByChainId = (chainId: EEthereumNetworkId) => {
  switch (chainId) {
    case EEthereumNetworkId.arbitrum:
      return EBlockchain.arbitrum;
    case EEthereumNetworkId.avalanche:
      return EBlockchain.avalanche;
    case EEthereumNetworkId.base:
      return EBlockchain.base;
    case EEthereumNetworkId.smartchain:
      return EBlockchain.bsc;
    case EEthereumNetworkId.fantom:
      return EBlockchain.fantom;
    case EEthereumNetworkId.flare:
      return EBlockchain.flare;
    case EEthereumNetworkId.gnosis:
      return EBlockchain.gnosis;
    case EEthereumNetworkId.linea:
      return EBlockchain.linea;
    case EEthereumNetworkId.optimism:
      return EBlockchain.optimism;
    case EEthereumNetworkId.polygon:
      return EBlockchain.polygon;
    case EEthereumNetworkId.polygonZkEVM:
      return EBlockchain.polygon_zkevm;
    case EEthereumNetworkId.rollux:
      return EBlockchain.rollux;
    case EEthereumNetworkId.scroll:
      return EBlockchain.scroll;
    case EEthereumNetworkId.syscoin:
      return EBlockchain.syscoin;
    case EEthereumNetworkId.avalancheTestnet:
      return EBlockchain.avalanche_fuji;
    case EEthereumNetworkId.goerli:
      return EBlockchain.eth_goerli;
    case EEthereumNetworkId.optimismTestnet:
      return EBlockchain.optimism_testnet;
    case EEthereumNetworkId.smartchainTestnet:
      return EBlockchain.bsc_testnet_chapel;
    case EEthereumNetworkId.arbitrumSepoliaTestnet:
      return EBlockchain.arbitrum_sepolia;
    case EEthereumNetworkId.mumbai:
      return EBlockchain.polygon_mumbai;
    case EEthereumNetworkId.fantomTestnet:
      return EBlockchain.fantom_testnet;
    case EEthereumNetworkId.holesky:
      return EBlockchain.eth_holesky;

    case EEthereumNetworkId.mainnet:
    default:
      return EBlockchain.eth;
  }
}

export const ethNetworkIdByBlockchainMap: Record<EBlockchain, EEthereumNetworkId> = {
  [EBlockchain.eth]: EEthereumNetworkId.mainnet,
  [EBlockchain.eth_goerli]: EEthereumNetworkId.goerli,
  [EBlockchain.eth_holesky]: EEthereumNetworkId.holesky,
  [EBlockchain.arbitrum]: EEthereumNetworkId.arbitrum,
  [EBlockchain.avalanche]: EEthereumNetworkId.avalanche,
  [EBlockchain.base]: EEthereumNetworkId.base,
  [EBlockchain.bsc]: EEthereumNetworkId.smartchain,
  [EBlockchain.fantom]: EEthereumNetworkId.fantom,
  [EBlockchain.flare]: EEthereumNetworkId.flare,
  [EBlockchain.gnosis]: EEthereumNetworkId.gnosis,
  [EBlockchain.linea]: EEthereumNetworkId.linea,
  [EBlockchain.optimism]: EEthereumNetworkId.optimism,
  [EBlockchain.polygon]: EEthereumNetworkId.polygon,
  [EBlockchain.polygon_zkevm]: EEthereumNetworkId.polygonZkEVM,
  [EBlockchain.rollux]: EEthereumNetworkId.rollux,
  [EBlockchain.scroll]: EEthereumNetworkId.scroll,
  [EBlockchain.syscoin]: EEthereumNetworkId.syscoin,
  [EBlockchain.avalanche_fuji]: EEthereumNetworkId.avalancheTestnet,
  [EBlockchain.optimism_testnet]: EEthereumNetworkId.optimismTestnet,
  [EBlockchain.bsc_testnet_chapel]: EEthereumNetworkId.smartchainTestnet,
  [EBlockchain.arbitrum_sepolia]: EEthereumNetworkId.arbitrumSepoliaTestnet,
  [EBlockchain.polygon_mumbai]: EEthereumNetworkId.mumbai,
  [EBlockchain.fantom_testnet]: EEthereumNetworkId.fantomTestnet,
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
