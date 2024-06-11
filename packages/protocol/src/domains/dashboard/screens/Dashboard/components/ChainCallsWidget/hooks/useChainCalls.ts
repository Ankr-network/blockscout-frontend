import { useMemo } from 'react';

import { chainsFetchPrivateChainsInfo } from 'domains/chains/actions/private/fetchPrivateChainsInfo';
import {
  selectChainCalls,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors/v1';
import { useAppSelector } from 'store/useAppSelector';

import { getPieChartData } from '../utils/getPieChartData';

export const useChainCalls = () => {
  const chainCalls = useAppSelector(selectChainCalls);
  const totalRequests = useAppSelector(selectTotalRequestsNumber);
  const { isLoading } = useAppSelector(chainsFetchPrivateChainsInfo.select({}));

  const data = useMemo(
    () => getPieChartData({ chainCalls, totalRequests }),
    [chainCalls, totalRequests],
  );

  return { data, isLoading, totalRequests };
};
