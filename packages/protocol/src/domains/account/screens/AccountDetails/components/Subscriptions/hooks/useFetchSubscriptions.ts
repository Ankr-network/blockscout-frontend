import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchSubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';

const defaultData: ISubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  hasCredentials: boolean;
}

export type FetchSubscriptions = [() => void, ISubscriptionsResponse, boolean];

export const useFetchSubscriptions = ({
  hasCredentials,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchSubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchSubscriptionsDataQuery();

  useEffect(() => {
    if (hasCredentials) {
      fetchSubscriptionsData();
    }
  }, [fetchSubscriptionsData, hasCredentials]);

  return [fetchSubscriptionsData, data, isLoading];
};
