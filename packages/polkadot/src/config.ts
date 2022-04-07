import { EEnvTypes, TNetworkType } from './entity';

export interface ISlotAuctionConfig {
  polkadotUrl: string;
  baseUrl: string;
  crowdloanStatusCheck?: boolean;
  cacheAge: number;
  networkType?: TNetworkType;
}

export const DEFAULT_WALLET_NAME = 'Polkadot{.js}';

export const CURRENT_ENV: EEnvTypes = process.env.REACT_APP_API_ENV
  ? (process.env.REACT_APP_API_ENV as EEnvTypes)
  : EEnvTypes.Develop;

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
  currentEnv: EEnvTypes,
): ISlotAuctionConfig => {
  const polkadotUrls: Record<TNetworkType, string> = {
    WND: 'wss://westend-rpc.polkadot.io',
    ROC: 'wss://rococo-rpc.polkadot.io',
    KSM: 'wss://kusama-rpc.polkadot.io',
    DOT: 'wss://rpc.polkadot.io',
  };

  const apiUrls: Record<string, string> = {
    develop: 'https://api.dev.stkr.io/',
    staging: 'https://api.goerli.stkr.io/',
    prod: 'https://api.stkr.io/',
  };

  return {
    polkadotUrl: polkadotUrls[networkType],
    baseUrl: apiUrls[currentEnv],
    crowdloanStatusCheck: currentEnv === EEnvTypes.Production,
    cacheAge: 10_000,
    networkType,
  };
};

export const DEVELOP_WESTEND_CONFIG = createSlotAuctionConfig(
  'WND',
  EEnvTypes.Develop,
);
export const DEVELOP_ROCOCO_CONFIG = createSlotAuctionConfig(
  'ROC',
  EEnvTypes.Develop,
);
export const DEVELOP_KUSAMA_CONFIG = createSlotAuctionConfig(
  'KSM',
  EEnvTypes.Develop,
);
export const DEVELOP_POLKADOT_CONFIG = createSlotAuctionConfig(
  'DOT',
  EEnvTypes.Develop,
);

export const STAGING_WESTEND_CONFIG = createSlotAuctionConfig(
  'WND',
  EEnvTypes.Stage,
);
export const STAGING_ROCOCO_CONFIG = createSlotAuctionConfig(
  'ROC',
  EEnvTypes.Stage,
);
export const STAGING_KUSAMA_CONFIG = createSlotAuctionConfig(
  'KSM',
  EEnvTypes.Stage,
);
export const STAGING_POLKADOT_CONFIG = createSlotAuctionConfig(
  'DOT',
  EEnvTypes.Stage,
);

export const MAINNET_WESTEND_CONFIG = createSlotAuctionConfig(
  'WND',
  EEnvTypes.Production,
);
export const MAINNET_ROCOCO_CONFIG = createSlotAuctionConfig(
  'ROC',
  EEnvTypes.Production,
);
export const MAINNET_KUSAMA_CONFIG = createSlotAuctionConfig(
  'KSM',
  EEnvTypes.Production,
);
export const MAINNET_POLKADOT_CONFIG = createSlotAuctionConfig(
  'DOT',
  EEnvTypes.Production,
);

export function configFromEnv(env = CURRENT_ENV): ISlotAuctionConfig {
  switch (env) {
    case EEnvTypes.Production:
      return MAINNET_POLKADOT_CONFIG;

    case EEnvTypes.Stage:
      return STAGING_WESTEND_CONFIG;

    case EEnvTypes.Develop:
    default:
      return DEVELOP_WESTEND_CONFIG;
  }
}
