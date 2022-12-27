import { ISubscriptionsResponse } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useLazyAccountFetchSubscriptionsDataQuery } from 'domains/account/actions/fetchMySubscriptionsData';

const defaultData: ISubscriptionsResponse = {
  items: [],
};

export interface FetchSubscriptionsParams {
  hasPremium: boolean;
}

export type FetchSubscriptions = [() => void, ISubscriptionsResponse, boolean];

export const useFetchSubscriptions = ({
  hasPremium,
}: FetchSubscriptionsParams): FetchSubscriptions => {
  const [fetchSubscriptionsData, { data = defaultData, isLoading }] =
    useLazyAccountFetchSubscriptionsDataQuery();

  useEffect(() => {
    if (hasPremium) {
      fetchSubscriptionsData();
    }
  }, [fetchSubscriptionsData, hasPremium]);

  return [fetchSubscriptionsData, data, isLoading];
};
