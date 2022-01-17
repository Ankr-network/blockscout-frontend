import { TNetworkType } from './entity';

export interface ISlotAuctionConfig {
  polkadotUrl: string;
  baseUrl: string;
  crowdloanStatusCheck?: boolean;
  cacheAge: number;
  networkType?: TNetworkType;
}

/**
 * @deprecated use other configs
 */
export const DEVELOP_CONFIG: ISlotAuctionConfig = {
  polkadotUrl: 'wss://westend-rpc.polkadot.io',
  baseUrl: 'https://api.dev.stkr.io/',
  crowdloanStatusCheck: false,
  cacheAge: 3_000,
  networkType: 'WND',
};

const createSlotAuctionConfig = (
  networkType: TNetworkType,
  currentEnv: 'develop' | 'goerli' | 'prod',
): ISlotAuctionConfig => {
  const polkadotUrls: Record<TNetworkType, string> = {
    WND: 'wss://westend-rpc.polkadot.io',
    ROC: 'wss://rococo-rpc.polkadot.io',
    KSM: 'wss://kusama-rpc.polkadot.io',
    DOT: 'wss://rpc.polkadot.io',
  };
  const apiUrls: Record<string, string> = {
    develop: 'https://api.dev.stkr.io/',
    goerli: 'https://api.goerli.stkr.io/',
    prod: 'https://api.stkr.io/',
  };
  return {
    polkadotUrl: polkadotUrls[networkType],
    baseUrl: apiUrls[currentEnv],
    crowdloanStatusCheck: currentEnv === 'prod',
    cacheAge: 10_000,
    networkType,
  };
};

export const DEVELOP_WESTEND_CONFIG = createSlotAuctionConfig('WND', 'develop');
export const DEVELOP_ROCOCO_CONFIG = createSlotAuctionConfig('ROC', 'develop');
export const DEVELOP_KUSAMA_CONFIG = createSlotAuctionConfig('KSM', 'develop');
export const DEVELOP_POLKADOT_CONFIG = createSlotAuctionConfig(
  'DOT',
  'develop',
);

export const GOERLI_WESTEND_CONFIG = createSlotAuctionConfig('WND', 'goerli');
export const GOERLI_ROCOCO_CONFIG = createSlotAuctionConfig('ROC', 'goerli');
export const GOERLI_KUSAMA_CONFIG = createSlotAuctionConfig('KSM', 'goerli');
export const GOERLI_POLKADOT_CONFIG = createSlotAuctionConfig('DOT', 'goerli');

export const MAINNET_WESTEND_CONFIG = createSlotAuctionConfig('WND', 'prod');
export const MAINNET_ROCOCO_CONFIG = createSlotAuctionConfig('ROC', 'prod');
export const MAINNET_KUSAMA_CONFIG = createSlotAuctionConfig('KSM', 'prod');
export const MAINNET_POLKADOT_CONFIG = createSlotAuctionConfig('DOT', 'prod');
