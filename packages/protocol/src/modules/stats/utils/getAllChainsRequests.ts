import { PrivateStats } from 'multirpc-sdk';

import { mapCountsToEntries } from './mapCountsToEntries';

export const getAllChainsRequests = (stats: PrivateStats) =>
  Object.entries(stats).flatMap(([, stat]) => mapCountsToEntries(stat?.counts));
