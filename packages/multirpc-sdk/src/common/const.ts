import type { AxiosRequestConfig } from 'axios';

import { IConfig } from './types';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export const STAGING_CONFIRMATION_BLOCKS = 1;
export const CONFIRMATION_BLOCKS = 12;

export const STAGING_CONFIG: IConfig = {
  ankrTokenContractAddress: '0x65BF0bD516aD41622e45bFD22dAD57ffF828333a',
  ankrWalletContractAddress: '0xD099e6Be8B30ACc74E3b4e6E80D5e0dB58291e93',
  confirmationBlocks: STAGING_CONFIRMATION_BLOCKS,
  privateRpcUrl: 'https://staging.multi-rpc.com/{blockchain}/{user}',
  privateWsUrl: 'wss://staging.multi-rpc.com/{blockchain}/ws/{user}',
  publicRpcUrl: 'https://staging.multi-rpc.com/{blockchain}',
  publicWsUrl: '',
  walletPrivateUrl: 'https://staging.protocol.ankr.com/',
  walletPublicUrl: 'https://staging.protocol.ankr.com/',
  workerUrl: 'https://staging.multi-rpc.com/',
  accountUrl: 'https://staging.multirpc.ankr.com/',
  backofficeUrl: 'https://backoffice-gateway.staging.multirpc.ankr.com/',

  payAsYouGoAnkrTokenContractAddress:
    '0xe602D8FC04B8D1AE717077f86FF06315405B70Dc',
  payAsYouGoContractAddress: '0x43FC63725b9f9A74EE4eD420635e78231456b52f',
};

export const LOCAL_CONFIG: IConfig = {
  ...STAGING_CONFIG,
  walletPublicUrl: 'http://localhost:8000/',
  walletPrivateUrl: 'http://localhost:8000/',
};

export const PROD_CONFIG: IConfig = {
  ankrTokenContractAddress: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
  ankrWalletContractAddress: '0x4432faEe427AE2CA961D5bfEEFC2EeD4e1f1D784',
  confirmationBlocks: CONFIRMATION_BLOCKS,
  privateRpcUrl: 'https://rpc.ankr.com/{blockchain}/{user}',
  privateWsUrl: 'wss://rpc.ankr.com/{blockchain}/ws/{user}',
  publicRpcUrl: 'https://rpc.ankr.com/{blockchain}',
  publicWsUrl: '',
  walletPrivateUrl: 'https://mainnet.protocol.ankr.com/',
  walletPublicUrl: 'https://mainnet.protocol.ankr.com/',
  workerUrl: 'https://next.multi-rpc.com/',
  accountUrl: 'https://mainnet.multirpc.ankr.com/',
  backofficeUrl: 'https://backoffice-gateway.staging.multirpc.ankr.com/',

  payAsYouGoAnkrTokenContractAddress:
    '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
  payAsYouGoContractAddress: '0x3d0BB8803a6C1Fee1b3E8bf730534574623cB70f',
};
