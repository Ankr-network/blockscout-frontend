import { PrivateStatsInternal } from 'multirpc-sdk';

import { SortChainsParams } from 'domains/chains/components/ChainsList';

export interface SortPrivateChainsParams extends SortChainsParams {
  stats: PrivateStatsInternal;
}
