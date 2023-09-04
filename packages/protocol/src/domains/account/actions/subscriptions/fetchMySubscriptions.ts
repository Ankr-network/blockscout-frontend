import { IApiUserGroupParams, ISubscriptionsResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchMySubscriptions },
  useFetchMySubscriptionsQuery,
  useLazyFetchMySubscriptionsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMySubscriptions: build.query<
      ISubscriptionsResponse,
      IApiUserGroupParams
    >({
      providesTags: ['MySubscriptions'],
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getSubscriptions({ group });

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
