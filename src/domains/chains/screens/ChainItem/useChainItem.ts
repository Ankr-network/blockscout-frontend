import { useCallback, useEffect, useRef, useState } from 'react';
import { Timeframe } from '@ankr.com/multirpc';
import { useDispatchRequest } from '@redux-requests/react';
import { getQuery } from '@redux-requests/core';

import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
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

  handleSetBreadcrumbs(chainName);
};

export const useTimeframeData = (chainId: string) => {
  const dispatchRequest = useDispatchRequest();
  const [timeframe, setTimeframe] = useState<Timeframe>('30d');

  useEffect(() => {
    dispatchRequest(fetchChainDetails(chainId, timeframe));
  }, [dispatchRequest, chainId, timeframe]);

  useInterval(
    (...args) => dispatchRequest(fetchChainDetails(...args)),
    POLL_INTERVAL,
    chainId,
    timeframe,
  );

  const { data, loading, error } = getQuery(store.getState(), {
    type: fetchChainDetails.toString(),
  });

  const handleSetTimeframe = useCallback((newTimeframe: Timeframe) => {
    if (newTimeframe) {
      setTimeframe(newTimeframe);
    }
  }, []);

  const { totalCached, totalRequests, totalRequestsHistory, countries } =
    data || {};

  return {
    timeframe,
    setTimeframe: handleSetTimeframe,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    countries,
    error,
  };
};
