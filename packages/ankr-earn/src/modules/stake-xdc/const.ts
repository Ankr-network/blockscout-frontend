import { getUniqueId } from '@ankr.com/common';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { XDC } from '@ankr.com/staking-sdk';

import { XDC_NETWORK_BY_ENV } from 'modules/common/const';
import { Seconds } from 'modules/common/types';

export const XDC_BLOCK_14_DAYS_OFFSET = XDC.XDC_BLOCK_1_DAY_RANGE * 14;

export const XDC_BLOCK_60_DAYS_OFFSET = XDC.XDC_BLOCK_1_DAY_RANGE * 60;

export const XDC_POLLING_INTERVAL: Seconds = 3_000;

export const XDC_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const XDC_STAKING_AMOUNT_STEP = 10;

export const XDC_STAKING_NETWORKS = [XDC_NETWORK_BY_ENV];

export const CacheTags = {
  stakeData: getUniqueId(),
  unstakeData: getUniqueId(),
};
