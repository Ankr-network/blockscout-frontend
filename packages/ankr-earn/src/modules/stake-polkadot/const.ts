import { AvailableWriteProviders } from 'provider';

import { EPolkadotNetworks } from './types';

export const POLKADOT_WRITE_PROVIDER_ID =
  AvailableWriteProviders.polkadotCompatible;

export const POLKADOT_NETWORK_KEYS = Object.keys(EPolkadotNetworks).map(
  network => network.toLowerCase(),
);

export const REDEEM_PERIOD_DAYS = {
  DEFAULT: 7,
  DOT: 28,
  KSM: 7,
  WND: 7,
};
