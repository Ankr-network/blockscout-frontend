import { AvailableWriteProviders } from 'provider';

import { ANKR_NETWORK_BY_ENV } from 'modules/common/const';
import { Days, Percentage } from 'modules/common/types';

export const ANKR_ACTIONS_PREFIX = 'ankr/';

export const ANKR_STAKING_NETWORKS = [ANKR_NETWORK_BY_ENV];

export const ANKR_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BAD_STATUS_RANGE: Percentage = 30;

export const LOCKING_PERIOD: Days = 777;

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
