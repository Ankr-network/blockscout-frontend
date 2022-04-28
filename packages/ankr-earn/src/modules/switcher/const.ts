import { t } from 'common';
import { BlockchainNetworkId } from 'provider';

import { configFromEnv } from 'modules/api/config';
import {
  BSC_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  featuresConfig,
  FTM_NETWORK_BY_ENV,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';

const { contractConfig, binanceConfig, fantomConfig } = configFromEnv();

export type AvailableSwitcherToken =
  | Token.aETHb
  | Token.aETHc
  | Token.aBNBb
  | Token.aBNBc
  | Token.aMATICb
  | Token.aMATICc
  | Token.aFTMb
  | Token.aFTMc;

export const SWITCHER_FROM_TOKENS = [
  Token.aETHb,
  Token.aBNBb,
  Token.aMATICb,
  Token.aFTMb,
];

export const SWITCHER_TO_TOKENS = [
  Token.aETHc,
  Token.aBNBc,
  Token.aMATICc,
  Token.aFTMc,
];

export const TOKEN_ADDRESSES: Record<AvailableSwitcherToken, string> = {
  [Token.aETHb]: contractConfig.fethContract,
  [Token.aETHc]: contractConfig.aethContract,
  [Token.aBNBb]: binanceConfig.aBNBbToken,
  [Token.aBNBc]: binanceConfig.aBNBcToken,
  [Token.aMATICb]: contractConfig.aMaticbToken,
  [Token.aMATICc]: contractConfig.aMaticCToken,
  [Token.aFTMb]: fantomConfig.aftmbToken,
  [Token.aFTMc]: fantomConfig.aftmcToken,
};

export const TOKEN_TOOLTIPS: Record<AvailableSwitcherToken, string> = {
  [Token.aETHb]: t('switcher.tooltips.aETHb'),
  [Token.aETHc]: t('switcher.tooltips.aETHc'),
  [Token.aBNBb]: t('switcher.tooltips.aBNBb'),
  [Token.aBNBc]: t('switcher.tooltips.aBNBc'),
  [Token.aMATICb]: t('switcher.tooltips.aMATICb'),
  [Token.aMATICc]: t('switcher.tooltips.aMATICc'),
  [Token.aFTMb]: t('switcher.tooltips.aFTMb'),
  [Token.aFTMc]: t('switcher.tooltips.aFTMc'),
};

export type AvailableSwitchNetwork =
  | BlockchainNetworkId.goerli
  | BlockchainNetworkId.mainnet
  | BlockchainNetworkId.smartchain
  | BlockchainNetworkId.smartchainTestnet
  | BlockchainNetworkId.fantom
  | BlockchainNetworkId.fantomTestnet;

export type AvailableSwitcherNativeToken =
  | Token.ETH
  | Token.BNB
  | Token.MATIC
  | Token.FTM;

export const NATIVE_TOKEN_BY_SWITCH_OPTION: Record<
  AvailableSwitcherToken,
  AvailableSwitcherNativeToken
> = {
  [Token.aETHb]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aBNBb]: Token.BNB,
  [Token.aBNBc]: Token.BNB,
  [Token.aMATICb]: Token.MATIC,
  [Token.aMATICc]: Token.MATIC,
  [Token.aFTMb]: Token.FTM,
  [Token.aFTMc]: Token.FTM,
};

export const CHAIN_ID_BY_TOKEN: Record<
  AvailableSwitcherToken,
  AvailableSwitchNetwork
> = {
  [Token.aETHb]: ETH_NETWORK_BY_ENV,
  [Token.aETHc]: ETH_NETWORK_BY_ENV,
  [Token.aBNBb]: BSC_NETWORK_BY_ENV,
  [Token.aBNBc]: BSC_NETWORK_BY_ENV,
  [Token.aMATICb]: ETH_NETWORK_BY_ENV,
  [Token.aMATICc]: ETH_NETWORK_BY_ENV,
  [Token.aFTMb]: FTM_NETWORK_BY_ENV,
  [Token.aFTMc]: FTM_NETWORK_BY_ENV,
};

export const BASIS_POINTS_FEE_BY_TOKEN: Record<AvailableSwitcherToken, number> =
  {
    [Token.aETHb]: 30,
    [Token.aETHc]: 30,
    [Token.aBNBb]: 10,
    [Token.aBNBc]: 10,
    [Token.aMATICb]: 10,
    [Token.aMATICc]: 10,
    [Token.aFTMb]: 10,
    [Token.aFTMc]: 10,
  };

export const DEFAULT_TOKENS_BY_NETWORK: Record<
  AvailableSwitchNetwork,
  { from: AvailableSwitcherToken; to: AvailableSwitcherToken }
> = {
  [BlockchainNetworkId.goerli]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.mainnet]: { from: Token.aETHb, to: Token.aETHc },
  [BlockchainNetworkId.smartchain]: { from: Token.aBNBb, to: Token.aBNBc },
  [BlockchainNetworkId.smartchainTestnet]: {
    from: Token.aBNBb,
    to: Token.aBNBc,
  },
  [BlockchainNetworkId.fantom]: { from: Token.aFTMb, to: Token.aFTMc },
  [BlockchainNetworkId.fantomTestnet]: {
    from: Token.aFTMb,
    to: Token.aFTMc,
  },
};

export enum SwitcherUrlParams {
  FROM = 'from',
  TO = 'to',
}

export const SWITCHER_TOKENS_MAP: Record<
  SwitcherUrlParams,
  Record<string, string>
> = {
  [SwitcherUrlParams.FROM]: {
    [Token.aETHb]: Token.aETHb,
    [Token.aBNBb]: Token.aBNBb,
    ...(featuresConfig.switcherMatic ? { [Token.aMATICb]: Token.aMATICb } : {}),
    ...(featuresConfig.switcherFantom ? { [Token.aFTMb]: Token.aFTMb } : {}),
  },

  [SwitcherUrlParams.TO]: {
    [Token.aETHc]: Token.aETHc,
    [Token.aBNBc]: Token.aBNBc,
    ...(featuresConfig.switcherMatic ? { [Token.aMATICc]: Token.aMATICc } : {}),
    ...(featuresConfig.switcherFantom ? { [Token.aFTMc]: Token.aFTMc } : {}),
  },
};

export type SwitcherFromKey = keyof typeof SWITCHER_TOKENS_MAP['from'];

export type SwitcherToKey = keyof typeof SWITCHER_TOKENS_MAP['to'];

export const SWITCHER_TOKENS_PAIR: Record<
  AvailableSwitcherToken,
  AvailableSwitcherToken
> = {
  [Token.aETHb]: Token.aETHc,
  [Token.aBNBb]: Token.aBNBc,
  [Token.aMATICb]: Token.aMATICc,
  [Token.aFTMb]: Token.aFTMc,
  [Token.aETHc]: Token.aETHb,
  [Token.aBNBc]: Token.aBNBb,
  [Token.aMATICc]: Token.aMATICb,
  [Token.aFTMc]: Token.aFTMb,
};
