import { MyBundleStatus, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchMyBundlesStatus },
  useFetchMyBundlesStatusQuery,
  useLazyFetchMyBundlesStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyBundlesStatus: build.query<
      MyBundleStatus[],
      Web3Address | undefined
    >({
      providesTags: ['MyBundles'],
      queryFn: createNotifyingQueryFn(async group => {
        const api = MultiService.getService().getAccountGateway();

        const data = await api.getMyBundlesStatus(group);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
