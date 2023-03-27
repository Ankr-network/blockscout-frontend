import { getUniqueId } from '@ankr.com/common';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { configFromEnv } from 'modules/api/config';
import {
  AVAX_NETWORK_BY_ENV,
  ETH_NETWORK_BY_ENV,
  FTM_NETWORK_BY_ENV,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';

const { contractConfig, fantomConfig, avalancheConfig } = configFromEnv();

export type AvailableSwitcherToken =
  | Token.aETHb
  | Token.aETHc
  | Token.aMATICb
  | Token.aMATICc
  | Token.aFTMb
  | Token.aFTMc
  | Token.aAVAXb
  | Token.aAVAXc;

export const SWITCHER_FROM_TOKENS = [
  Token.aETHb,
  Token.aMATICb,
  Token.aFTMb,
  Token.aAVAXb,
];

export const SWITCHER_TO_TOKENS = [
  Token.aETHc,
  Token.aBNBc,
  Token.aMATICc,
  Token.aFTMc,
  Token.aAVAXc,
];

export const TOKEN_ADDRESSES: Record<AvailableSwitcherToken, string> = {
  [Token.aETHb]: contractConfig.fethContract,
  [Token.aETHc]: contractConfig.aethContract,
  [Token.aMATICb]: contractConfig.aMaticbToken,
  [Token.aMATICc]: contractConfig.aMaticCToken,
  [Token.aFTMb]: fantomConfig.aftmbToken,
  [Token.aFTMc]: fantomConfig.aftmcToken,
  [Token.aAVAXb]: avalancheConfig.aAVAXb,
  [Token.aAVAXc]: avalancheConfig.aAVAXc,
};

export type AvailableSwitchNetwork =
  | EEthereumNetworkId.goerli
  | EEthereumNetworkId.mainnet
  | EEthereumNetworkId.fantom
  | EEthereumNetworkId.fantomTestnet
  | EEthereumNetworkId.avalanche
  | EEthereumNetworkId.avalancheTestnet;

export type AvailableSwitcherNativeToken =
  | Token.ETH
  | Token.BNB
  | Token.MATIC
  | Token.FTM
  | Token.AVAX;

export const NATIVE_TOKEN_BY_SWITCH_OPTION: Record<
  AvailableSwitcherToken,
  AvailableSwitcherNativeToken
> = {
  [Token.aETHb]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aMATICb]: Token.MATIC,
  [Token.aMATICc]: Token.MATIC,
  [Token.aFTMb]: Token.FTM,
  [Token.aFTMc]: Token.FTM,
  [Token.aAVAXb]: Token.AVAX,
  [Token.aAVAXc]: Token.AVAX,
};

export const CHAIN_ID_BY_TOKEN: Record<
  AvailableSwitcherToken,
  AvailableSwitchNetwork
> = {
  [Token.aETHb]: ETH_NETWORK_BY_ENV,
  [Token.aETHc]: ETH_NETWORK_BY_ENV,
  [Token.aMATICb]: ETH_NETWORK_BY_ENV,
  [Token.aMATICc]: ETH_NETWORK_BY_ENV,
  [Token.aFTMb]: FTM_NETWORK_BY_ENV,
  [Token.aFTMc]: FTM_NETWORK_BY_ENV,
  [Token.aAVAXb]: AVAX_NETWORK_BY_ENV,
  [Token.aAVAXc]: AVAX_NETWORK_BY_ENV,
};

export const DEFAULT_TOKENS_BY_NETWORK: Record<
  AvailableSwitchNetwork,
  { from: AvailableSwitcherToken; to: AvailableSwitcherToken }
> = {
  [EEthereumNetworkId.goerli]: { from: Token.aETHb, to: Token.aETHc },
  [EEthereumNetworkId.mainnet]: { from: Token.aETHb, to: Token.aETHc },
  [EEthereumNetworkId.fantom]: { from: Token.aFTMb, to: Token.aFTMc },
  [EEthereumNetworkId.fantomTestnet]: {
    from: Token.aFTMb,
    to: Token.aFTMc,
  },
  [EEthereumNetworkId.avalanche]: { from: Token.aAVAXb, to: Token.aAVAXc },
  [EEthereumNetworkId.avalancheTestnet]: {
    from: Token.aAVAXb,
    to: Token.aAVAXc,
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
    [Token.aMATICb]: Token.aMATICb,
    [Token.aFTMb]: Token.aFTMb,
    [Token.aAVAXb]: Token.aAVAXb,
  },

  [SwitcherUrlParams.TO]: {
    [Token.aETHc]: Token.aETHc,
    [Token.aBNBc]: Token.aBNBc,
    [Token.aMATICc]: Token.aMATICc,
    [Token.aFTMc]: Token.aFTMc,
    [Token.aAVAXc]: Token.aAVAXc,
  },
};

export type SwitcherFromKey = keyof typeof SWITCHER_TOKENS_MAP['from'];

export type SwitcherToKey = keyof typeof SWITCHER_TOKENS_MAP['to'];

export const SWITCHER_TOKENS_PAIR: Record<
  AvailableSwitcherToken,
  AvailableSwitcherToken
> = {
  [Token.aETHb]: Token.aETHc,
  [Token.aMATICb]: Token.aMATICc,
  [Token.aFTMb]: Token.aFTMc,
  [Token.aAVAXb]: Token.aAVAXc,
  [Token.aETHc]: Token.aETHb,
  [Token.aMATICc]: Token.aMATICb,
  [Token.aFTMc]: Token.aFTMb,
  [Token.aAVAXc]: Token.aAVAXb,
};

export const POLING_INTERVAL = 5_000;

export const SwitcherCacheTags = {
  common: getUniqueId(),
};
