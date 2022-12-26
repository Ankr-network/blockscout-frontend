import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchSubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';

const defaultData: ISubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  isConnected: boolean;
}

export type FetchSubscriptions = [() => void, ISubscriptionsResponse, boolean];

export const useFetchSubscriptions = ({
  isConnected,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchSubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchSubscriptionsDataQuery();

  useEffect(() => {
    if (isConnected) {
      fetchSubscriptionsData();
    }
  }, [fetchSubscriptionsData, isConnected]);

  return [fetchSubscriptionsData, data, isLoading];
};
