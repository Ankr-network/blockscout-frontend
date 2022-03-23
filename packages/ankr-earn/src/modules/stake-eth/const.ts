import { AvailableWriteProviders } from 'provider';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';

export const ETH_ACTIONS_PREFIX = 'eth/';

export const ETH_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];

export const ETH_PROVIDER_ID = AvailableWriteProviders.ethCompatible;

export const ETH_STAKING_AMOUNT_STEP = 0.5;
