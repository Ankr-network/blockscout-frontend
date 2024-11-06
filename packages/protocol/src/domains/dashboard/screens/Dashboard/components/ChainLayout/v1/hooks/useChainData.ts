import { useMemo } from 'react';

import { getChartDataByRequests } from 'domains/chains/utils/getChartDataByRequests';
import {
  selectAllTimeTotalRequestsNumber,
  selectBlockHeight,
} from 'domains/dashboard/store/selectors/v1';
import { selectPrivateTotalStatsLoading } from 'modules/stats/actions/fetchPrivateTotalStats';
import { useAppSelector } from 'store/useAppSelector';
import { usePrivateStatsParams } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateStatsParams';

import { ChainLayoutProps } from '../../types';
import { useChainStatsData } from './useChainStatsData';
import { useChainStatsDataBySelectedProject } from './useChainStatsDataBySelectedProject';
import { useTop10Stats } from '../../../AllChainsLayout/v1/hooks/useTop10Stats';

export const useChainData = ({
  detailsChainId,
  statsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const { group, selectedProject } = usePrivateStatsParams({ timeframe });

  const chainStatsData = useChainStatsData({
    chainId: statsChainId,
    timeframe,
  });
  const chainStatsBySelectedProject = useChainStatsDataBySelectedProject({
    chainId: statsChainId,
    timeframe,
  });

  const {
    chainStats,
    loading: privateStatsLoading,
    methodCalls,
    requests,
    totalRequestsNumber,
  } = selectedProject ? chainStatsBySelectedProject : chainStatsData;

  const allTimeTotalRequestsNumber = useAppSelector(state =>
    selectAllTimeTotalRequestsNumber(state, { group }, statsChainId),
  );

  const requestsChartData = useMemo(
    () => getChartDataByRequests({ isLoggedIn: true, requests, timeframe }),
    [requests, timeframe],
  );

  const {
    countries,
    ipRequests,
    loading: top10StatsLoading,
  } = useTop10Stats(timeframe, statsChainId);

  const totalStatsLoading = useAppSelector(state =>
    selectPrivateTotalStatsLoading(state, { group }),
  );

  const blockHeight = useAppSelector(state =>
    selectBlockHeight(state, detailsChainId),
  );

  return {
    allTimeTotalRequestsNumber,
    blockHeight,
    chainStats,
    countries,
    ipRequests,
    methodCalls,
    privateStatsLoading,
    requestsChartData,
    top10StatsLoading,
    totalRequestsNumber,
    totalStatsLoading,
  };
};
