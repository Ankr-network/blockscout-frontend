import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider-core';

import { Token } from 'modules/common/types/token';
import { UNSTAKE_DAY_INTERVALS_BY_TOKEN } from 'modules/stake/const';

import { ETH_NETWORK_BY_ENV, isMainnet } from '../common/const';

import {
  EPolkadotNetworks,
  EPolkadotNetworksMainnet,
  EPolkadotNetworksTestnet,
} from './types';

export const ETH_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const ETH_WRITE_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const POLKADOT_WRITE_PROVIDER_ID =
  AvailableWriteProviders.polkadotCompatible;

export const ETH_NETWORKS = [ETH_NETWORK_BY_ENV];

export const POLKADOT_NETWORK_KEYS = Object.keys(
  isMainnet ? EPolkadotNetworksMainnet : EPolkadotNetworksTestnet,
);

export const EXPLORER_POLKADOT_URLS: Record<EPolkadotNetworks, string> = {
  [EPolkadotNetworks.DOT]: 'https://polkadot.subscan.io',
  [EPolkadotNetworks.KSM]: 'https://kusama.subscan.io',
  [EPolkadotNetworks.WND]: 'https://westend.subscan.io',
};

export const MIN_STAKE_VALUE = {
  DEFAULT: 0.1,
  DOT: 1,
  KSM: 0.1,
  WND: 0.1,
};

export const REDEEM_PERIOD_DAYS = {
  DEFAULT: Number(UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.WND]),
  DOT: Number(UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.DOT]),
  KSM: Number(UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.KSM]),
  WND: Number(UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.WND]),
};
