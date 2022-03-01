import { AvailableWriteProviders, AvailableReadProviders } from 'provider';

import { AVAX_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';

export const AVALANCHE_POOL_CONTRACT_START_BLOCK = isMainnet ? 1696977 : 178962;

export const AVALANCHE_WRITE_PROVIDER_ID =
  AvailableWriteProviders.ethCompatible;

export const AVALANCHE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.avalancheChain
  : AvailableReadProviders.avalancheChainTest;

export const AVAX_STAKING_NETWORKS = [AVAX_NETWORK_BY_ENV];

export const AVAX_DECIMALS = 18;
export const AVAX_MAX_BLOCK_RANGE = 3_000;

// Note: Mainnet = ~7 days. Testnet = ~4 hours
export const AVAX_REDEEM_PERIOD = isMainnet ? 7 : 4;
