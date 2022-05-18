import { AvailableWriteProviders, AvailableReadProviders } from 'provider';

import { BSC_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';

export const BINANCE_POOL_CONTRACT_START_BLOCK = isMainnet
  ? 15_336_167
  : 16_716_904;

export const BINANCE_HISTORY_BLOCK_OFFSET = 28_800 * 14;

export const BINANCE_WRITE_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BINANCE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.binanceChain
  : AvailableReadProviders.binanceChainTest;

export const BNB_STAKING_NETWORKS = [BSC_NETWORK_BY_ENV];

// Note: ~4h = 5_000 blocks, ~2.5h = 2_500 blocks
export const BNB_MAX_BLOCK_RANGE = isMainnet ? 2_500 : 5_000;

// Note: Mainnet = ~7-15 days. Testnet = ~4 hours
export const BNB_REDEEM_PERIOD = isMainnet ? '7-15' : '4';

export const BNB_STAKING_MAX_DECIMALS_LEN = 8;
export const BNB_SAFE_PRECISION = BNB_STAKING_MAX_DECIMALS_LEN + 1;
