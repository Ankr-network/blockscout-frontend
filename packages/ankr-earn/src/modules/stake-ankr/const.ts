import { AvailableWriteProviders } from 'provider';

import { ANKR_NETWORK_BY_ENV } from 'modules/common/const';
import { Percentage } from 'modules/common/types';

export const ANKR_STAKING_NETWORKS = [ANKR_NETWORK_BY_ENV];

export const ANKR_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const BAD_STATUS_RANGE: Percentage = 30;

export enum EProviderStatus {
  /**
   * ℹ️ Green color
   */
  good,
  /**
   * ℹ️ Red color
   */
  bad,
  /**
   * ℹ️ Clock icon
   */
  bonding,
}
