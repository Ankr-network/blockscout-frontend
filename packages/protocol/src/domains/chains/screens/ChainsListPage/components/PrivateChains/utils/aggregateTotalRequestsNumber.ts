import { PrivateStatsInternal } from 'multirpc-sdk';
import { ChainID } from '@ankr.com/chains-list';

import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainPage/components/UsageDataSection/const';

export interface AggregateTotalRequestsNumberParams {
  ids: ChainID[];
  stats?: PrivateStatsInternal;
}

export const aggregateTotalRequestsNumber = ({
  ids,
  stats = {},
}: AggregateTotalRequestsNumberParams) =>
  [...new Set(ids.map(id => checkPrivateChainsAndGetChainId(id)))].reduce(
    (result, id) => result + (stats[id]?.total_requests || 0),
    0,
  );
