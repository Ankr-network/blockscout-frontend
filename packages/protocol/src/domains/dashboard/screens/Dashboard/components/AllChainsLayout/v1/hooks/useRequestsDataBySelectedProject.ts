import { Timeframe } from '@ankr.com/chains-list';

import { selectPrivateStatsByTokenLoading } from 'modules/stats/actions/fetchPrivateStatsByToken';
import {
  selectTotalRequestsBySelectedProject,
  selectTotalRequestsNumberBySelectedProject,
} from 'domains/dashboard/store/selectors/v1';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

export interface IUseRequestsDataBySelectedProjectProps {
  timeframe: Timeframe;
}

export const useRequestsDataBySelectedProject = ({
  timeframe,
}: IUseRequestsDataBySelectedProjectProps) => {
  const { group, interval, selectedProject } = usePrivateStatsParams({
    timeframe,
  });

  const token = selectedProject!;

  const requests = useAppSelector(state =>
    selectTotalRequestsBySelectedProject(state, { group, interval }),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumberBySelectedProject(state, {
      group,
      interval,
      token,
    }),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsByTokenLoading(state, { group, interval, token }),
  );

  return { loading, requests, totalRequestsNumber };
};
