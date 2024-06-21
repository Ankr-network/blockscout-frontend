import type { AxiosRequestConfig } from 'axios';
import BigNumber from 'bignumber.js';

import { IConfig } from './types';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export const CONFIRMATION_BLOCKS = 12;

export const TEN = new BigNumber(10);

export const ENTERPRISE_API_KEY_QUERY_PARAM = 'apikey';

export const STAGING_CONFIG: IConfig = {
  ankrTokenContractAddress: '0xce3d800f567B7c2e23CE7FdaB8872DFC00B76C38',
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
    '0xce3d800f567B7c2e23CE7FdaB8872DFC00B76C38',
  payAsYouGoContractAddress: '0xa3f4c3d305F0897C125e2eACcf35Cea69Ce4fDf9',
  premiumPlanContractCreationBlockNumber: 6_708_096,
  payAsYouGoContractCreationBlockNumber: 6_895_851,
  advancedApiUrl:
    'https://rpc.ankr.com/multichain/f8e4e17caa0ff53dbba438d87f25bb8d29734490c488292c062cf020be629a98',
};

export const PROD_CONFIG: IConfig = {
  ankrTokenContractAddress: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
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
    'https://rpc.ankr.com/multichain/f8e4e17caa0ff53dbba438d87f25bb8d29734490c488292c062cf020be629a98',
};

export const DATE_MULTIPLIER = 1_000_000;

export const postRequestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}
