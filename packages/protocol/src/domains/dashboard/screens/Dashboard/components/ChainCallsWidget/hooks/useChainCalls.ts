import { useMemo } from 'react';

import {
  selectChainCalls,
  selectTotalRequestsNumber,
} from 'domains/dashboard/store/selectors/v1';
import { useAppSelector } from 'store/useAppSelector';
import { selectBlockchainsLoadingStatus } from 'modules/chains/store/selectors';

import { getPieChartData } from '../utils/getPieChartData';

export const useChainCalls = () => {
  const chainCalls = useAppSelector(selectChainCalls);
  const totalRequests = useAppSelector(selectTotalRequestsNumber);
  const isLoading = useAppSelector(selectBlockchainsLoadingStatus);

  const data = useMemo(
    () => getPieChartData({ chainCalls, totalRequests }),
    [chainCalls, totalRequests],
  );

  return { data, isLoading, totalRequests };
};
