import { useEffect } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { useEnterpriseSelectedToken } from './useEnterpriseSelectedToken';
import { useLazyChainsFetchEnterpriseStatsByApiKeyQuery } from '../actions/fetchEnterpriseStatsByApiKey';
import { useLazyChainsFetchEnterpriseStatsTotalQuery } from '../actions/fetchEnterpriseStatsTotal';

interface EnterpriseStatsRequestParams {
  interval: PrivateStatsInterval;
  shouldFetch?: boolean;
}

export const useEnterpriseStatsRequest = ({
  interval,
  shouldFetch,
}: EnterpriseStatsRequestParams) => {
  const { userEndpointToken } = useEnterpriseSelectedToken();

  const [fetchEnterpriseStatsByApiKey] =
    useLazyChainsFetchEnterpriseStatsByApiKeyQuery();

  const [fetchEnterpriseStatsTotal] =
    useLazyChainsFetchEnterpriseStatsTotalQuery();

  useEffect(() => {
    if (!shouldFetch) {
      return () => {};
    }

    if (userEndpointToken) {
      const { abort } = fetchEnterpriseStatsByApiKey({
        interval,
        userEndpointToken,
      });

      return abort;
    }

    const { abort } = fetchEnterpriseStatsTotal({
      interval,
    });

    return abort;
  }, [
    userEndpointToken,
    shouldFetch,
    fetchEnterpriseStatsTotal,
    fetchEnterpriseStatsByApiKey,
    interval,
  ]);
};
