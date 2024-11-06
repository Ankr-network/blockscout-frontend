import { Timeframe } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { selectBlockchainsLoadingStatus } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { getPieChartData } from '../utils/getPieChartData';
import { useChainCallsData } from './useChainCallsData';
import { useChainCallsDataBySelectedProject } from './useChainCallsDataBySelectedProject';
import { usePrivateStatsParams } from '../../../hooks/usePrivateStatsParams';

export interface IUseChainCallsProps {
  timeframe: Timeframe;
}

export const useChainCalls = ({ timeframe }: IUseChainCallsProps) => {
  const { selectedProject } = usePrivateStatsParams({ timeframe });

  const chainCallsData = useChainCallsData({ timeframe });
  const chainCallsDataBySelectedProject = useChainCallsDataBySelectedProject({
    timeframe,
  });

  const blockchainsLoading = useAppSelector(selectBlockchainsLoadingStatus);

  const {
    chainCalls,
    loading: chainCallsDataLoading,
    totalRequests,
  } = selectedProject ? chainCallsDataBySelectedProject : chainCallsData;

  const loading = blockchainsLoading || chainCallsDataLoading;

  const data = useMemo(
    () => getPieChartData({ chainCalls, totalRequests }),
    [chainCalls, totalRequests],
  );

  return { data, loading, totalRequests };
};
