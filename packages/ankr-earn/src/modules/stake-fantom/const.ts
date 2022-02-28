import { AvailableReadProviders, AvailableWriteProviders } from 'provider';

import { FTM_NETWORK_BY_ENV, isMainnet } from 'modules/common/const';
import { Days } from 'modules/common/types';

export const ACTIONS_PREFIX = 'fantom/';

export const POOL_START_BLOCK = isMainnet ? 31_218_797 : 7_729_481;

export const MAX_BLOCK_RANGE = isMainnet ? 2_500 : 5_000;

export const FANTOM_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const FANTOM_PROVIDER_READ_ID = isMainnet
  ? AvailableReadProviders.ftmOpera
  : AvailableReadProviders.ftmTestnet;

export const FANTOM_STAKING_NETWORKS = [FTM_NETWORK_BY_ENV];

export const FANTOM_UNSTAKE_PERIOD: Days = 35;
