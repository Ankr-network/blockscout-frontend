import { AvailableReadProviders } from '@ankr.com/provider';

import { isMainnet } from 'modules/common/const';

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
