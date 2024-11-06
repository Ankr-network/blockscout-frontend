import { Timeframe } from '@ankr.com/chains-list';

import { selectPrivateStatsLoading } from 'modules/stats/actions/fetchPrivateStats';
import {
  selectTotalRequests,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors/v1';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

export interface IUseRequestsDataProps {
  timeframe: Timeframe;
}

export const useRequestsData = ({ timeframe }: IUseRequestsDataProps) => {
  const { group, interval } = usePrivateStatsParams({ timeframe });

  const requests = useAppSelector(state =>
    selectTotalRequests(state, { group, interval }),
  );

  const totalRequestsNumber = useAppSelector(state =>
    selectTotalRequestsNumber(state, { group, interval }),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsLoading(state, { group, interval }),
  );

  return { loading, requests, totalRequestsNumber };
};
