import { AvailableWriteProviders } from '@ankr.com/provider';

import { GNO_NETWORK_BY_ENV } from 'modules/common/const';

export const MGNO_STAKING_NETWORKS = [GNO_NETWORK_BY_ENV];

export const MGNO_ACTIONS_PREFIX = 'mgno/';

export const MGNO_STAKE_FORM_ID = 'mgnoStake';

export const PROVIDER_STATS = 'v1alpha/beacon/gnosis/providers/';

export const MGNO_TOKEN_PRICE = 'v1alpha/rate/gno';

export const SLASHING_PROTECTION_VAR = 6_400;

export const GNO_TO_MGNO_DIVIDER = 32;

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
