import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from '../common';

/**
 * Start block to check events for Ethereum pool
 */
export const FANTOM_POOL_START_BLOCK = isMainnet ? 31_218_797 : 7_729_481;

/**
 * Max block range per request
 */
export const FANTOM_MAX_BLOCK_RANGE = isMainnet ? 2_000 : 3_000;

/**
 * Block offset to get history events for 7 days
 */
export const FANTOM_BLOCK_WEEK_OFFSET = isMainnet ? 604_800 : 120_960;

/**
 * Internal read provider id
 */
export const FANTOM_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ftmOpera
  : AvailableReadProviders.ftmTestnet;

/**
 * Even with this multiplier, the gas estimate is two times less
 * than if we did not manage this value.
 *
 * @note Magic number, 40%
 */
export const FANTOM_ESTIMATE_GAS_MULTIPLIER = 1.4; // 40%

/**
 * Magic number to avoid problems with max amount and fee calculation in the wallet
 */
export const FANTOM_GAS_FEE_MULTIPLIER = 3.5;
