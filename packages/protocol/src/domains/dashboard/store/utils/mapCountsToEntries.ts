import { PrivateStatCounts } from 'multirpc-sdk';

import { RequestsEntry } from '../types';

export const mapCountsToEntries = (counts: PrivateStatCounts = {}) =>
  Object.entries(counts).map<RequestsEntry>(([timestamp, { count }]) => [
    timestamp,
    count,
  ]);
