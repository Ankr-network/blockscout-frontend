import { ChainID, Timeframe } from '@ankr.com/chains-list';

import {
  selectChainStats,
  selectMethodCallsByChainID,
  selectTotalRequestsByChainID,
  selectTotalRequestsNumberByChainID,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsLoading } from 'modules/stats/actions/fetchPrivateStats';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';

export interface IUseChainStatsDataProps {
  chainId: ChainID;
  timeframe: Timeframe;
}

export const useChainStatsData = ({
  chainId,
  timeframe,
}: IUseChainStatsDataProps) => {
  const { group, interval } = usePrivateStatsParams({ timeframe });

  usePrivateStats({ group, interval });

  const chainStats = useAppSelector(state =>
    selectChainStats(state, { group, interval }, chainId),
  );

  const requests = useAppSelector(state =>
    selectTotalRequestsByChainID(state, { group, interval }, chainId),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumberByChainID(state, { group, interval }, chainId),
  );

  const methodCalls = useAppSelector(state =>
    selectMethodCallsByChainID(state, { group, interval }, chainId),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsLoading(state, { group, interval }),
  );

  return { chainStats, loading, methodCalls, requests, totalRequestsNumber };
};
