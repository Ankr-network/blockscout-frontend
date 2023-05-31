import { useMemo } from 'react';

import { chainsFetchPrivateChainsInfo } from 'domains/chains/actions/private/fetchPrivateChainsInfo';
import { getPieChartData } from '../utils/getPieChartData';
import {
  selectChainCalls,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

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
