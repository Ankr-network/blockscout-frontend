import { IMySubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchMySubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';

const defaultData: IMySubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  hasCredentials: boolean;
}

export type FetchSubscriptions = [IMySubscriptionsResponse, boolean];

export const useFetchSubscriptions = ({
  hasCredentials,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchMySubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchMySubscriptionsDataQuery();

  useEffect(() => {
    if (hasCredentials) {
      fetchMySubscriptionsData();
    }
  }, [fetchMySubscriptionsData, hasCredentials]);

  return [data, isLoading];
};
