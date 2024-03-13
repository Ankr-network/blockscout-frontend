import type { AxiosRequestConfig } from 'axios';

import { IConfig } from './types';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export const CONFIRMATION_BLOCKS = 12;

export const ENTERPRISE_API_KEY_QUERY_PARAM = 'apikey';

export const STAGING_CONFIG: IConfig = {
  ankrTokenContractAddress: '0xe602D8FC04B8D1AE717077f86FF06315405B70Dc',
  premiumPlanContractAddress: '0xD099e6Be8B30ACc74E3b4e6E80D5e0dB58291e93',
  confirmationBlocks: CONFIRMATION_BLOCKS,
  publicEnterpriseRpcUrl: 'https://enterprise-staging.onerpc.com/{blockchain}',
  enterpriseRpcUrl: `https://enterprise-staging.onerpc.com/{blockchain}?${ENTERPRISE_API_KEY_QUERY_PARAM}={user}`,
  enterpriseWsUrl: `wss://enterprise-staging.onerpc.com/{blockchain}?${ENTERPRISE_API_KEY_QUERY_PARAM}={user}`,
  privateRpcUrl: 'https://staging.multi-rpc.com/{blockchain}/{user}',
  privateWsUrl: 'wss://staging.multi-rpc.com/{blockchain}/ws/{user}',
  publicRpcUrl: 'https://staging.multi-rpc.com/{blockchain}',
  consensusUrl: 'https://staging.protocol.ankr.com/',
  workerUrl: 'https://staging.multi-rpc.com/',
  accountUrl: 'https://staging.multirpc.ankr.com/',
  backofficeUrl:
    'https://backoffice-gateway.staging.multirpc.ankr.com/api/v1/auth',
  uAuthUrl: 'https://staging-uauth.ankr.com/api/v1',
  payAsYouGoAnkrTokenContractAddress:
    '0xe602D8FC04B8D1AE717077f86FF06315405B70Dc',
  payAsYouGoContractAddress: '0x43FC63725b9f9A74EE4eD420635e78231456b52f',
  premiumPlanContractCreationBlockNumber: 6_708_096,
  payAsYouGoContractCreationBlockNumber: 6_895_851,
  advancedApiUrl:
    'https://rpc.ankr.com/multichain/22f47d3ba3a58db992435834a85b79b0ab4a36666acfc6da518fb793a90b3834',
};

export const PROD_CONFIG: IConfig = {
  ankrTokenContractAddress: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
  premiumPlanContractAddress: '0x4432faEe427AE2CA961D5bfEEFC2EeD4e1f1D784',
  confirmationBlocks: CONFIRMATION_BLOCKS,
  publicEnterpriseRpcUrl: 'https://enterprise.onerpc.com/{blockchain}',
  enterpriseRpcUrl: `https://enterprise.onerpc.com/{blockchain}?${ENTERPRISE_API_KEY_QUERY_PARAM}={user}`,
  enterpriseWsUrl: `wss://enterprise.onerpc.com/{blockchain}?${ENTERPRISE_API_KEY_QUERY_PARAM}={user}`,
  privateRpcUrl: 'https://rpc.ankr.com/{blockchain}/{user}',
  privateWsUrl: 'wss://rpc.ankr.com/{blockchain}/ws/{user}',
  publicRpcUrl: 'https://rpc.ankr.com/{blockchain}',
  consensusUrl: 'https://mainnet.protocol.ankr.com/',
  workerUrl: 'https://next.multi-rpc.com/',
  accountUrl: 'https://mainnet.multirpc.ankr.com/',
  backofficeUrl:
    'https://backoffice-gateway.mainnet.multirpc.ankr.com/api/v1/auth',
  uAuthUrl: 'https://uauth.ankr.com/api/v1',
  payAsYouGoAnkrTokenContractAddress:
    '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
  payAsYouGoContractAddress: '0x3d0BB8803a6C1Fee1b3E8bf730534574623cB70f',
  premiumPlanContractCreationBlockNumber: 13_468_996,
  payAsYouGoContractCreationBlockNumber: 14_787_826,
  advancedApiUrl:
    'https://rpc.ankr.com/multichain/22f47d3ba3a58db992435834a85b79b0ab4a36666acfc6da518fb793a90b3834',
};

export const DATE_MULTIPLIER = 1_000_000;
