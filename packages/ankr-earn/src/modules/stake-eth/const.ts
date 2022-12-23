import { getUniqueId } from '@ankr.com/common';

import { ETH_NETWORK_BY_ENV } from 'modules/common/const';

export const ETH_STAKING_NETWORKS = [ETH_NETWORK_BY_ENV];

export const ETH_STAKING_AMOUNT_STEP = 0.5;

export const CacheTags = {
  common: getUniqueId(),
};
