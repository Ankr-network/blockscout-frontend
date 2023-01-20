import { getUniqueId } from '@ankr.com/common';

export const MATIC_POLYGON_ACTIONS_PREFIX = 'matic/polygon/';
export const POLLING_INTERVAL = 3_000;

export const CacheTags = {
  common: `stake-matic-polygon-${getUniqueId()}`,
};
