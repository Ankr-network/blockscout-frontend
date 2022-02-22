import { PrefixedHex } from './types';

export interface IConfig {
  confirmationBlocks: number;
  walletPublicUrl: string;
  walletPrivateUrl: string;
  workerUrl: string;
  ankrWalletContractAddress: PrefixedHex;
  ankrTokenContractAddress: PrefixedHex;
  publicRpcUrl: string;
  publicWsUrl: string;
  privateRpcUrl: string;
  privateWsUrl: string;
}

export const CONFIRMATION_BLOCKS = 12;

export const STAGING_CONFIG: IConfig = {
  confirmationBlocks: CONFIRMATION_BLOCKS,
  walletPublicUrl: 'https://staging.protocol.ankr.com/',
  walletPrivateUrl: 'https://staging.protocol.ankr.com/',
  workerUrl: 'https://staging.multi-rpc.com/',
  ankrWalletContractAddress: '0xD099e6Be8B30ACc74E3b4e6E80D5e0dB58291e93',
  ankrTokenContractAddress: '0x65BF0bD516aD41622e45bFD22dAD57ffF828333a',
  publicRpcUrl: 'https://staging.multi-rpc.com/{blockchain}',
  publicWsUrl: '',
  privateRpcUrl: 'https://staging.multi-rpc.com/{blockchain}/{user}',
  privateWsUrl: 'wss://staging.multi-rpc.com/{blockchain}/ws/{user}',
};

export const LOCAL_CONFIG: IConfig = {
  ...STAGING_CONFIG,
  walletPublicUrl: 'http://localhost:8000/',
  walletPrivateUrl: 'http://localhost:8000/',
};

export const PROD_CONFIG: IConfig = {
  confirmationBlocks: CONFIRMATION_BLOCKS,
  walletPublicUrl: 'https://mainnet.protocol.ankr.com/',
  walletPrivateUrl: 'https://mainnet.protocol.ankr.com/',
  workerUrl: 'https://next.multi-rpc.com/',
  ankrWalletContractAddress: '0x4432faEe427AE2CA961D5bfEEFC2EeD4e1f1D784',
  ankrTokenContractAddress: '0x8290333cef9e6d528dd5618fb97a76f268f3edd4',
  publicRpcUrl: 'https://rpc.ankr.com/{blockchain}',
  publicWsUrl: '',
  privateRpcUrl: 'https://rpc.ankr.com/{blockchain}/{user}',
  privateWsUrl: 'wss://rpc.ankr.com/{blockchain}/ws/{user}',
};

export type Environment = 'local' | 'staging' | 'prod';

export const configFromEnv = (env: Environment): IConfig => {
  // eslint-disable-next-line default-case
  switch (env) {
    case 'local':
      return LOCAL_CONFIG;
    case 'staging':
      return STAGING_CONFIG;
    case 'prod':
      return PROD_CONFIG;
  }
  throw new Error(`There is no config for env (${env})`);
};
