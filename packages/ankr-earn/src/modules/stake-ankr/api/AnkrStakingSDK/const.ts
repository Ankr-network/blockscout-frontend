import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';
import { Milliseconds, Seconds } from 'modules/common/types';

import { TValidatorPrettyStatus } from './types';

export const VALIDATOR_STATUS_MAPPING: Record<string, TValidatorPrettyStatus> =
  {
    '0': 'NOT_FOUND',
    '1': 'ACTIVE',
    '2': 'PENDING',
    '3': 'JAILED',
  };

/**
 * Internal read provider id
 */
export const ANKR_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const SECONDS_IN_A_DAY = 86_400;

export const ANKR_STAKING_MAX_DECIMALS_LENGTH = 8;

/**
 * The number by which we need to divide the `amount` from delegations queue
 * to get the human readable format.
 */
export const AMOUNT_FROM_QUEUE_SCALE = 1e8;

export const ANKR_HISTORY_START_BLOCK = isMainnet ? 15_275_019 : 7_220_323;

export const ANKR_HISTORY_BLOCK_RANGE = 3_000;

/**
 * Is used for gas limit formula to be able to claim all ANKR rewards
 * per one transaction.
 *
 * For more information please see [STAKAN-2462](https://ankrnetwork.atlassian.net/browse/STAKAN-2462)
 */
export const GAS_LIMIT_MULTIPLIER = 130_000;

/**
 * Is used for gas limit formula.
 *
 * For more information please see [STAKAN-2547](https://ankrnetwork.atlassian.net/browse/STAKAN-2547)
 */
export const GAS_LIMIT_PER_EPOCH = 13_000;

export const ONE_DAY_SEC: Seconds = 60 * 60 * 24;
export const ONE_DAY_MS: Milliseconds = 1000 * ONE_DAY_SEC;

/**
 * Hardcoded value for gas limit for unstake method.
 * We can't accurate calculate it for this method.
 */
export const UNSTAKE_GAS_LIMIT = 300_000;

/**
 * Multiplier for gas limit calculation.
 */
export const ANKR_ESTIMATE_GAS_MULTIPLIER = 1.5;
