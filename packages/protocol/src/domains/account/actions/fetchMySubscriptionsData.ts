import { ISubscriptionsResponse } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { fetchSubscriptions } from '../utils/fetchSubscriptions';

export const {
  useLazyAccountFetchSubscriptionsDataQuery,
  endpoints: { accountFetchSubscriptionsData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchSubscriptionsData: build.query<ISubscriptionsResponse, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const data = await fetchSubscriptions();
        return { data };
      }),
    }),
  }),
});
