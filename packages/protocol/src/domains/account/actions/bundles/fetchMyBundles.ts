import { ISubscriptionsItem, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';

interface IFetchMyBundlesParams {
  group?: Web3Address;
}

export const {
  endpoints: { fetchMyBundles },
  useLazyFetchMyBundlesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyBundles: build.query<ISubscriptionsItem[], IFetchMyBundlesParams>({
      providesTags: [RequestType.MyBundles],
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getMyBundles(group);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
