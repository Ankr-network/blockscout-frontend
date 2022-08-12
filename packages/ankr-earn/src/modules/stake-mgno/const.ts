import { AvailableWriteProviders } from '@ankr.com/provider';

import { GNO_NETWORK_BY_ENV } from 'modules/common/const';

export const MGNO_STAKING_NETWORKS = [GNO_NETWORK_BY_ENV];

export const MGNO_ACTIONS_PREFIX = 'mgno/';

export const MGNO_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

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
