import { AvailableWriteProviders } from 'common';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';

export const SSV_ACTIONS_PREFIX = 'ethereum-ssv/';

export const SSV_MAX_DECIMALS_LEN = 1;

export const SSV_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const SSV_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];
