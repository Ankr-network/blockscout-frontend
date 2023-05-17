import { IApiUserGroupParams, ISubscriptionsResponse } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { fetchSubscriptions } from './subscriptions/fetchSubscriptions';

export const {
  useLazyAccountFetchSubscriptionsDataQuery,
  endpoints: { accountFetchSubscriptionsData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchSubscriptionsData: build.query<
      ISubscriptionsResponse,
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const data = await fetchSubscriptions({ group });

        return { data };
      }),
    }),
  }),
});
