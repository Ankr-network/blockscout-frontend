import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider';

import { isMainnet } from '../common';

/**
 * Internal write provider id
 */
export const AVALANCHE_WRITE_PROVIDER_ID =
  AvailableWriteProviders.ethCompatible;

/**
 * Internal read provider id
 */
export const AVALANCHE_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.avalancheChain
  : AvailableReadProviders.avalancheChainTest;

const AVAX_POOL_START_BLOCK_MAINNET = 1696977;
const AVAX_POOL_START_BLOCK_TESTNET = 178962;

/**
 * Avalanche pool start block. Block number when the pool was deployed.
 */
export const AVAX_POOL_START_BLOCK = isMainnet
  ? AVAX_POOL_START_BLOCK_MAINNET
  : AVAX_POOL_START_BLOCK_TESTNET;

/**
 * AVAX token decimals
 */
export const AVAX_DECIMALS = 18;

/**
 * Scale factor fo AVAX token
 */
export const AVAX_SCALE_FACTOR = 1e18;

/**
 * Max block range per request
 */
export const AVAX_MAX_BLOCK_RANGE = 3_000;

/**
 * Events block range for stake/unstake history
 *
 * @note 404_000 blocks = ~14 days
 */
export const AVAX_HISTORY_2_WEEKS_OFFSET = AVAX_MAX_BLOCK_RANGE * 135;

/**
 * Even with this multiplier, the gas estimate is two times less
 * than if we did not manage this value.
 *
 * @note Magic number, 60%
 */
export const AVAX_ESTIMATE_GAS_MULTIPLIER = 1.6;

/**
 * Magic number to avoid problems with max amount and fee calculation in the wallet
 */
export const GAS_FEE_MULTIPLIER = 3;
