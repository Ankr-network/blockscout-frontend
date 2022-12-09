import { getUniqueId } from '@ankr.com/common';

import { AvailableReadProviders } from '@ankr.com/provider';

import { FTM_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { Token } from 'modules/common/types/token';
import { UNSTAKE_DAY_INTERVALS_BY_TOKEN } from 'modules/stake/const';

export const POOL_START_BLOCK = isMainnet ? 31_218_797 : 7_729_481;

export const MAX_BLOCK_RANGE = isMainnet ? 2_000 : 5_000;

export const BLOCK_OFFSET = 201_600; // 7 days

export const FANTOM_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ftmOpera
  : AvailableReadProviders.ftmTestnet;

export const FANTOM_STAKING_NETWORKS = [FTM_NETWORK_BY_ENV];

export const FANTOM_UNSTAKE_PERIOD: Days = Number(
  UNSTAKE_DAY_INTERVALS_BY_TOKEN[Token.FTM],
);

export const CacheTags = {
  common: getUniqueId(),
};
