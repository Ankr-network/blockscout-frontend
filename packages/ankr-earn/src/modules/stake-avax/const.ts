import { getUniqueId } from '@ankr.com/common';

import { AvailableReadProviders } from '@ankr.com/provider';

import { AVAX_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';

export const AVALANCHE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.avalancheChain
  : AvailableReadProviders.avalancheChainTest;

export const AVAX_STAKING_NETWORKS = [AVAX_NETWORK_BY_ENV];

export const AVAX_DECIMALS = 18;
export const AVAX_SCALE_FACTOR = 1e18;

export const AVAX_MAX_BLOCK_RANGE = 3_000;

export const CacheTags = {
  common: `stake-avax-${getUniqueId()}`,
};
