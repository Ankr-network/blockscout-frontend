import { AvailableReadProviders } from '@ankr.com/provider-core';

import { BSC_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { UNSTAKE_DAY_INTERVALS_BY_TOKEN } from 'modules/stake/const';

export const BINANCE_POOL_CONTRACT_START_BLOCK = isMainnet
  ? 15_336_167
  : 16_716_904;

export const BINANCE_HISTORY_BLOCK_OFFSET = 28_800 * 14;

export const BINANCE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.binanceChain
  : AvailableReadProviders.binanceChainTest;

export const BNB_STAKING_NETWORKS = [BSC_NETWORK_BY_ENV];

// Note: ~4h = 5_000 blocks, ~2.5h = 2_500 blocks
export const BNB_MAX_BLOCK_RANGE = isMainnet ? 2_500 : 5_000;

// Note: Mainnet = ~7-10 days. Testnet = ~4 hours
export const BNB_REDEEM_PERIOD = UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.BNB];

export const AVAILABLE_BNB_SYNT_TOKENS = <const>[
  Token.aBNBb,
  Token.aBNBc,
  Token.aETH,
  Token.aETHc,
];
