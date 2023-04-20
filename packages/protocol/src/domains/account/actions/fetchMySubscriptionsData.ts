import { ISubscriptionsResponse } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { fetchSubscriptions } from '../utils/fetchSubscriptions';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  useLazyAccountFetchSubscriptionsDataQuery,
  endpoints: { accountFetchSubscriptionsData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchSubscriptionsData: build.query<ISubscriptionsResponse, void>({
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const { selectedGroupAddress: group } = getSelectedGroupAddress(
          getState as GetState,
        );
        const data = await fetchSubscriptions({ group });

        return { data };
      }),
    }),
  }),
});
