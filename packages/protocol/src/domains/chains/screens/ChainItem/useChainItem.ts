import { useCallback, useEffect, useRef, useState } from 'react';
import { Timeframe } from 'multirpc-sdk';
import { useDispatchRequest } from '@redux-requests/react';
import { getQuery } from '@redux-requests/core';

import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
// eslint-disable-next-line import/no-cycle
import { ChainsRoutesConfig } from '../../Routes';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';
import useInterval from 'modules/common/hooks/useInterval';
import { store } from 'store';

const POLL_INTERVAL = 20_000;

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
  const dispatchRequest = useDispatchRequest();
  const [timeframe, setTimeframe] = useState<Timeframe>(date);

  useEffect(() => {
    dispatchRequest(fetchChainDetails(chainId, timeframe));
  }, [dispatchRequest, chainId, timeframe]);

  useInterval(
    (...args) => dispatchRequest(fetchChainDetails(...args)),
    POLL_INTERVAL,
    chainId,
    timeframe,
  );

  const { data, loading, error, pristine } = getQuery(store.getState(), {
    type: fetchChainDetails.toString(),
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
  };
};
