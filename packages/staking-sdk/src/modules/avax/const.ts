import {
  AvailableWriteProviders,
  AvailableReadProviders,
} from 'common';

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
 * Max block parallel requests to rpc
 */
export const AVAX_MAX_PARALLEL_REQ = 100;

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
