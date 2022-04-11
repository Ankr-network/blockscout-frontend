import { BlockchainNetworkId } from 'provider';

import { configFromEnv } from 'modules/api/config';
import { BSC_NETWORK_BY_ENV, ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';

const { contractConfig, binanceConfig } = configFromEnv();

export type AvailableSwitcherToken =
  | Token.aETHb
  | Token.aETHc
  | Token.aBNBb
  | Token.aBNBc;

export const TOKEN_ADDRESSES: Record<AvailableSwitcherToken, string> = {
  [Token.aETHb]: contractConfig.fethContract,
  [Token.aETHc]: contractConfig.aethContract,
  [Token.aBNBb]: binanceConfig.aBNBbToken,
  [Token.aBNBc]: binanceConfig.aBNBcToken,
};

export const TOKEN_TOOLTIPS: Record<AvailableSwitcherToken, string> = {
  [Token.aETHb]: t('switcher.tooltips.aETHb'),
  [Token.aETHc]: t('switcher.tooltips.aETHc'),
  [Token.aBNBb]: t('switcher.tooltips.aBNBb'),
  [Token.aBNBc]: t('switcher.tooltips.aBNBc'),
};

export type AvailableSwitchNetworks =
  | BlockchainNetworkId.goerli
  | BlockchainNetworkId.mainnet
  | BlockchainNetworkId.smartchain
  | BlockchainNetworkId.smartchainTestnet;

export type AvailableSwitcherNativeToken = Token.ETH | Token.BNB;

export const NATIVE_TOKEN_BY_SWITCH_OPTION: Record<
  AvailableSwitcherToken,
  AvailableSwitcherNativeToken
> = {
  [Token.aETHb]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aBNBb]: Token.BNB,
  [Token.aBNBc]: Token.BNB,
};

export const CHAIN_ID_BY_TOKEN: Record<
  AvailableSwitcherToken,
  AvailableSwitchNetworks
> = {
  [Token.aETHb]: ETH_NETWORK_BY_ENV,
  [Token.aETHc]: ETH_NETWORK_BY_ENV,
  [Token.aBNBb]: BSC_NETWORK_BY_ENV,
  [Token.aBNBc]: BSC_NETWORK_BY_ENV,
};
