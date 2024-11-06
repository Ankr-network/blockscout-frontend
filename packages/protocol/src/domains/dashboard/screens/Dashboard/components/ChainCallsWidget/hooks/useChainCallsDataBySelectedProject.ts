import { Timeframe } from '@ankr.com/chains-list';

import {
  selectChainCallsBySelectedProject,
  selectTotalRequestsNumberBySelectedProject,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsByTokenLoading } from 'modules/stats/actions/fetchPrivateStatsByToken';
import { useAppSelector } from 'store/useAppSelector';

import { usePrivateStatsParams } from '../../../hooks/usePrivateStatsParams';

export interface IUseChainCallsDataProps {
  timeframe: Timeframe;
}

export const useChainCallsDataBySelectedProject = ({
  timeframe,
}: IUseChainCallsDataProps) => {
  const { group, interval, selectedProject } = usePrivateStatsParams({
    timeframe,
  });

  const token = selectedProject!;

  const chainCalls = useAppSelector(state =>
    selectChainCallsBySelectedProject(state, { group, interval }),
  );
  const totalRequests = useAppSelector(state =>
    selectTotalRequestsNumberBySelectedProject(state, {
      group,
      interval,
      token,
    }),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsByTokenLoading(state, { group, interval, token }),
  );

  return { chainCalls, totalRequests, loading };
};
