import { getUniqueId } from '@ankr.com/common';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { XDC_NETWORK_BY_ENV } from 'modules/common/const';
import { Seconds } from 'modules/common/types';

export const XDC_POLLING_INTERVAL: Seconds = 3_000;

export const XDC_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const XDC_STAKING_AMOUNT_STEP = 10;

export const XDC_STAKING_NETWORKS = [XDC_NETWORK_BY_ENV];

export const CacheTags = {
  stakeData: getUniqueId(),
};
