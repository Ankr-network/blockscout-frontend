import { configFromEnv, ETH_NETWORK_BY_ENV, isMainnet } from '../common';

import { TEthToken } from './types';

/**
 * Start block to check events for Ethereum pool
 */
export const ETH_POOL_START_BLOCK = isMainnet ? 11_225_126 : 3_829_233;

/**
 * Block offset to get 14 days history events
 */
export const ETH_BLOCK_2_WEEKS_OFFSET = isMainnet ? 100_800 : 80_640;

/**
 * Block step range for events
 */
export const ETH_HISTORY_RANGE_STEP = 3_000;

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

/**
 * Tokens config for wallet
 */
export const TOKENS_CONFIG_BY_SYMBOL: Record<
  TEthToken,
  { address: string; symbol: string; decimals: number; chainId: number }
> = {
  aETHc: {
    address: config.contractConfig.aethContract,
    symbol: 'aETHc',
    decimals: 18,
    chainId: ETH_NETWORK_BY_ENV,
  },

  aETHb: {
    address: config.contractConfig.fethContract,
    symbol: 'aETHb',
    decimals: 18,
    chainId: ETH_NETWORK_BY_ENV,
  },
};
