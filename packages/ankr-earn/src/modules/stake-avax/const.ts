import { AvailableWriteProviders, AvailableReadProviders } from 'common';

import { AVAX_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';

export const AVALANCHE_WRITE_PROVIDER_ID =
  AvailableWriteProviders.ethCompatible;

export const AVALANCHE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.avalancheChain
  : AvailableReadProviders.avalancheChainTest;

export const AVAX_STAKING_NETWORKS = [AVAX_NETWORK_BY_ENV];

export const AVAX_DECIMALS = 18;
export const AVAX_SCALE_FACTOR = 1e18;

export const AVAX_MAX_BLOCK_RANGE = 3_000;

// Note: 750_000 blocks = ~26 days
export const AVAX_MAX_HISTORY_RANGE = AVAX_MAX_BLOCK_RANGE * 250;

export const AVAX_MAX_PARALLEL_REQ = 100;
