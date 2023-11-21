import { PrivateStatsInternal } from 'multirpc-sdk';

import { mapCountsToEntries } from './mapCountsToEntries';

export const getAllChainsRequests = (stats: PrivateStatsInternal) =>
  Object.entries(stats).flatMap(([, stat]) => mapCountsToEntries(stat?.counts));
