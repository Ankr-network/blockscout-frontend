import { useCallback, useEffect, useRef, useState } from 'react';
import { Timeframe } from 'multirpc-sdk';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
// eslint-disable-next-line import/no-cycle
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { fetchChainTimeframeData } from 'domains/chains/actions/fetchChainTimeframeData';

const POLL_INTERVAL = 20;

export const useChainItemBreadcrumbs = (chainName: string) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const hasBreadcrumbsRef = useRef<boolean>(false);
  const handleSetBreadcrumbs = useCallback(
    (title: string) => {
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(ChainsRoutesConfig.chains.breadcrumbs),
          link: ChainsRoutesConfig.chains.path,
        },
        {
          title,
        },
      ]);
    },
    [setBreadcrumbs],
  );

  useEffect(() => {
    handleSetBreadcrumbs(chainName);
  }, [handleSetBreadcrumbs, chainName]);
};

export const useTimeframeData = (chainId: string, date: Timeframe = '24h') => {
  const dispatch = useDispatch();

  const dispatchRequest = useDispatchRequest();
  const [timeframe, setTimeframe] = useState<Timeframe>(date);

  useEffect(() => {
    dispatchRequest(fetchChainTimeframeData(chainId, timeframe, POLL_INTERVAL));

    return () => {
      dispatch(
        stopPolling([
          {
            requestType: fetchChainTimeframeData.toString(),
            requestKey: chainId,
          },
        ]),
      );
    };
  }, [dispatchRequest, chainId, timeframe, dispatch]);

  const { data, loading, error, pristine } = useQuery({
    type: fetchChainTimeframeData.toString(),
    requestKey: chainId,
  });

  const handleSetTimeframe = useCallback((newTimeframe: Timeframe) => {
    if (newTimeframe) {
      setTimeframe(newTimeframe);
    }
  }, []);

  const { totalCached, totalRequests, totalRequestsHistory, countries } =
    data || {};

  const normilizedTotalRequestsHistory = {} as any;
  const removeLastDot = () => {
    const historyKeys = Object.keys(totalRequestsHistory).sort(
      (a: string, b: string) => {
        return +a - +b;
      },
    );

    historyKeys.pop();

    historyKeys.forEach(key => {
      normilizedTotalRequestsHistory[key] = totalRequestsHistory[key];
    });
  };

  if (totalRequestsHistory) {
    removeLastDot();
  }

  return {
    timeframe,
    setTimeframe: handleSetTimeframe,
    loading,
    pristine,
    totalCached,
    totalRequests,
    totalRequestsHistory: normilizedTotalRequestsHistory,
    countries,
    error,
    data,
  };
};
