import { Timeframe } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { selectBlockchainsLoadingStatus } from 'modules/chains/store/selectors';
import {
  selectChainCalls,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateStatsLoading } from 'domains/chains/actions/private/fetchPrivateStats';
import { useAppSelector } from 'store/useAppSelector';

import { getPieChartData } from '../utils/getPieChartData';
import { usePrivateStatsParams } from '../../../hooks/usePrivateStatsParams';

export interface IUseChainCallsProps {
  timeframe: Timeframe;
}

export const useChainCalls = ({ timeframe }: IUseChainCallsProps) => {
  const { privateStatsParams } = usePrivateStatsParams({ timeframe });

  const chainCalls = useAppSelector(state =>
    selectChainCalls(state, privateStatsParams),
  );
  const totalRequests = useAppSelector(state =>
    selectTotalRequestsNumber(state, privateStatsParams),
  );
  const blockchainsLoading = useAppSelector(selectBlockchainsLoadingStatus);
  const privateStatsLoading = useAppSelector(state =>
    selectPrivateStatsLoading(state, privateStatsParams),
  );

  const isLoading = blockchainsLoading || privateStatsLoading;

  const data = useMemo(
    () => getPieChartData({ chainCalls, totalRequests }),
    [chainCalls, totalRequests],
  );

  return { data, isLoading, totalRequests };
};
