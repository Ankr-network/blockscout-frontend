import { getUniqueId } from '@ankr.com/common';

import { SUI_NETWORK_BY_ENV } from 'modules/common/const';

export const SUI_STAKING_NETWORKS = [SUI_NETWORK_BY_ENV];

export const CacheTags = {
  common: getUniqueId(),
};
