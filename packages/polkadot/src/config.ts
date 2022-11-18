import { EEnvTypes, TNetworkType } from './entity';
import { Address } from '@ankr.com/provider';
import { currentEnv, Env, IStkrConfig } from '@ankr.com/staking-sdk';

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
  baseUrl: 'https://api.dev.staking.ankr.com/',
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
    develop: 'https://api.dev.staking.ankr.com/',
    staging: 'https://api.goerli.staking.ankr.com/',
    prod: 'https://api.staking.ankr.com/',
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

interface IPolkadotConfig {
  aDOTbToken: Address | null;
  aKSMbToken: Address | null;
  aWNDbToken: Address | null;
  polkadotPool: Address;
}

const LOCAL_CONFIG: IPolkadotConfig = {
  aDOTbToken: null,
  aKSMbToken: null,
  aWNDbToken: '0xF8942990985cB8E3196b24B7f9c584945493AC3A',
  polkadotPool: '0xc9EdEe06D78aE8Ee0d694b2e96E457a239F4DeeE',
};

const DEV_CONFIG: IPolkadotConfig = {
  ...LOCAL_CONFIG,
};

const GOERLI_CONFIG: IPolkadotConfig = {
  ...LOCAL_CONFIG,
};

const MAINNET_CONFIG: IPolkadotConfig = {
  aDOTbToken: '0x5cc56c266143f29a5054b9ae07f3ac3513a7965e',
  aKSMbToken: '0x84da8e731172827fcb233b911678e2a82e27baf2',
  aWNDbToken: null,
  polkadotPool: '0x59f767EC659E9FE01ebCf930465E2aD4Cc0F208e',
};

export function stakingConfigFromEnv(env: Env = currentEnv): IPolkadotConfig {
  switch (env) {
    case Env.Production:
      return MAINNET_CONFIG;
    case Env.Stage:
      return GOERLI_CONFIG;
    case Env.Develop:
      return DEV_CONFIG;
    default:
      return LOCAL_CONFIG;
  }
}
