/* istanbul ignore file */
// TODO: remove ignore when tests are ready
import { AvailableWriteProviders, AvailableReadProviders } from 'provider';

import { BSC_NETWORK_BY_ENV, isMainnet } from '../common';

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

export const BNB_STAKING_MAX_DECIMALS_LEN = 8;
export const BNB_SAFE_PRECISION = BNB_STAKING_MAX_DECIMALS_LEN + 1;

export const CERT_STAKING_LOG_HASH =
  '0x0f0bc5b519ddefdd8e5f9e6423433aa2b869738de2ae34d58ebc796fc749fa0d';

export const ESTIMATE_GAS_MULTIPLIER = 1.4; // 40%
