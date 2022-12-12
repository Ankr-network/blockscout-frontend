import { getUniqueId } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import {
  AvailableReadProviders,
  AvailableWriteProviders,
} from '@ankr.com/provider';

import {
  ETH_NETWORK_BY_ENV,
  isMainnet,
  SUI_NETWORK_BY_ENV,
} from 'modules/common/const';

export const SUI_STAKING_NETWORKS = [SUI_NETWORK_BY_ENV];

export const ETH_READ_PROVIDER_ID = isMainnet
  ? AvailableReadProviders.ethMainnet
  : AvailableReadProviders.ethGoerli;

export const ETH_NETWORKS = [ETH_NETWORK_BY_ENV];

export const ANKR_SUI_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const ANKR_SUI_DECIMALS = 18;

// todo: check it!
export const SUI_MIN_STAKE_AMOUNT = new BigNumber(0.1);

export const CacheTags = {
  common: getUniqueId(),
};
