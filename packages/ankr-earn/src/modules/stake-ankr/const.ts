import { AvailableWriteProviders } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

import { ANKR_NETWORK_BY_ENV } from 'modules/common/const';
import { Milliseconds, Percentage } from 'modules/common/types';

export const ANKR_TOKEN_PRICE = 'v1alpha/rate/ANKR';

export const ANKR_ACTIONS_PREFIX = 'ankr/';

export const ANKR_STAKING_NETWORKS = [ANKR_NETWORK_BY_ENV];

export const ANKR_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BAD_STATUS_RANGE: Percentage = 30;

export const ANKR_STAKE_FORM_ID = 'ankrStake';

export const TEMPORARY_APY = new BigNumber(9);

export enum EProviderStatus {
  /**
   * ℹ️ Red color
   */
  notFound,
  /**
   * ℹ️ Green color
   */
  active,
  /**
   * ℹ️ Clock icon
   */
  pending,
}

export const CACHE_TIME: Milliseconds = 1_000 * 30;
