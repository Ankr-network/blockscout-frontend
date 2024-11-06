import { BlockchainStatsCounts } from 'multirpc-sdk';

import { RequestsEntry } from '../../../domains/dashboard/store/types';

export const mapCountsToEntries = (counts: BlockchainStatsCounts = {}) =>
  Object.entries(counts).map<RequestsEntry>(([timestamp, { count }]) => [
    timestamp,
    count,
  ]);
