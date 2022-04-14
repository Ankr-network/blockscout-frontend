import { AvailableReadProviders, AvailableWriteProviders } from 'provider';

import { ETH_NETWORK_BY_ENV, isMainnet } from '../common/const';

import { EPolkadotNetworksMainnet, EPolkadotNetworksTestnet } from './types';

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

export const MIN_STAKE_VALUE = {
  DEFAULT: 0.1,
  DOT: 1,
  KSM: 0.1,
  WND: 0.1,
};

export const REDEEM_PERIOD_DAYS = {
  DEFAULT: 7,
  DOT: 28,
  KSM: 7,
  WND: 7,
};
