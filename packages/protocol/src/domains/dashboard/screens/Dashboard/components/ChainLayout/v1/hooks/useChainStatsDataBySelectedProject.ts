import { ChainID, Timeframe } from '@ankr.com/chains-list';

import {
  selectChainStatsBySelectedProject,
  selectMethodCallsByChainIDBySelectedProject,
  selectTotalRequestsByChainIDBySelectedProject,
  selectTotalRequestsNumberByChainIDBySelectedProject,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsByTokenLoading } from 'modules/stats/actions/fetchPrivateStatsByToken';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';
import { useAppSelector } from 'store/useAppSelector';

export interface IUseChainStatsDataBySelectedProjectProps {
  chainId: ChainID;
  timeframe: Timeframe;
}

export const useChainStatsDataBySelectedProject = ({
  chainId,
  timeframe,
}: IUseChainStatsDataBySelectedProjectProps) => {
  const { group, interval, selectedProject } = usePrivateStatsParams({
    timeframe,
  });

  const chainStats = useAppSelector(state =>
    selectChainStatsBySelectedProject(state, { group, interval }, chainId),
  );

  const requests = useAppSelector(state =>
    selectTotalRequestsByChainIDBySelectedProject(
      state,
      { group, interval },
      chainId,
    ),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumberByChainIDBySelectedProject(
      state,
      { group, interval },
      chainId,
    ),
  );

  const methodCalls = useAppSelector(state =>
    selectMethodCallsByChainIDBySelectedProject(
      state,
      { group, interval },
      chainId,
    ),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsByTokenLoading(state, {
      group,
      interval,
      token: selectedProject!,
    }),
  );

  return { chainStats, loading, methodCalls, requests, totalRequestsNumber };
};
