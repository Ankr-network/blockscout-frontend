import { configFromEnv, isMainnet } from '../common';

import { TEthToken } from './types';

/**
 * Start block to check events for Ethereum pool
 */
export const ETH_POOL_START_BLOCK = isMainnet ? 11_225_126 : 3_829_233;

/**
 * Block offset to get latest history events
 */
export const ETH_BLOCK_OFFSET = 50_400; // 7 days

/**
 * Block step range for events
 */
export const ETH_HISTORY_RANGE_STEP = 15_000;

/**
 * Methods by token symbol
 */
export const METHOD_NAME_BY_SYMBOL: Record<
  TEthToken,
  { stake: string; claim: string; claimable: string }
> = {
  aETHb: {
    stake: 'stakeAndClaimAethB',
    claim: 'claimFETH',
    claimable: 'claimableAETHFRewardOf',
  },
  aETHc: {
    stake: 'stakeAndClaimAethC',
    claim: 'claimAETH',
    claimable: 'claimableAETHRewardOf',
  },
};

const config = configFromEnv();

export const TOKENS_CONFIG_BY_SYMBOL: Record<
  TEthToken,
  { address: string; symbol: string; decimals: number }
> = {
  aETHc: {
    address: config.contractConfig.aethContract,
    symbol: 'aETHc',
    decimals: 18,
  },

  aETHb: {
    address: config.contractConfig.fethContract,
    symbol: 'aETHb',
    decimals: 18,
  },
};
