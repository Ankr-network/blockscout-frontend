import { PrivateStatsInternal } from 'multirpc-sdk';

import { ChainID } from 'domains/chains/types';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainItem/components/UsageDataSection/const';

export interface AggregateTotalRequestsNumberParams {
  ids: ChainID[];
  stats?: PrivateStatsInternal;
}

export const aggregateTotalRequestsNumber = ({
  ids,
  stats = {},
}: AggregateTotalRequestsNumberParams) =>
  [...new Set(ids.map(checkPrivateChainsAndGetChainId))].reduce(
    (result, id) => result + (stats[id]?.total_requests ?? 0),
    0,
  );