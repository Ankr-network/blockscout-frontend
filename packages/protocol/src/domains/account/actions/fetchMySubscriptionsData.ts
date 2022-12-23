import { IMySubscriptionsResponse } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { fetchMySubscriptions } from '../utils/fetchMySubscriptions';

export const {
  useLazyAccountFetchMySubscriptionsDataQuery,
  endpoints: { accountFetchMySubscriptionsData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchMySubscriptionsData: build.query<
      IMySubscriptionsResponse,
      void
    >({
      queryFn: createNotifyingQueryFn(async () => {
        const data = await fetchMySubscriptions();
        return { data };
      }),
    }),
  }),
});
