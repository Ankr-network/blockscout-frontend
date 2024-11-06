import { Timeframe } from '@ankr.com/chains-list';

import {
  selectChainCalls,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsLoading } from 'modules/stats/actions/fetchPrivateStats';
import { useAppSelector } from 'store/useAppSelector';

import { usePrivateStatsParams } from '../../../hooks/usePrivateStatsParams';

export interface IUseChainCallsDataProps {
  timeframe: Timeframe;
}

export const useChainCallsData = ({ timeframe }: IUseChainCallsDataProps) => {
  const { group, interval } = usePrivateStatsParams({ timeframe });

  const chainCalls = useAppSelector(state =>
    selectChainCalls(state, { group, interval }),
  );
  const totalRequests = useAppSelector(state =>
    selectTotalRequestsNumber(state, { group, interval }),
  );

  const loading = useAppSelector(state =>
    selectPrivateStatsLoading(state, { group, interval }),
  );

  return { chainCalls, totalRequests, loading };
};
