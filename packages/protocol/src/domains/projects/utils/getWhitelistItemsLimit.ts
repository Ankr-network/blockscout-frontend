import { UserEndpointTokenMode } from 'multirpc-sdk';

import { whitelistItemsLimitsMap } from '../const';

export const getWhitelistItemsLimit = (type: UserEndpointTokenMode) =>
  whitelistItemsLimitsMap[type];
