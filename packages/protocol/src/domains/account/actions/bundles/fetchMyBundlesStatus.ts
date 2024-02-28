import { MyBundleStatus, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';

// import { fetchMyBundlesStatusMockData } from './fetchMyBundlesStatusMockData'; // use for debugging

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
      providesTags: [RequestType.MyBundles],
      queryFn: createNotifyingQueryFn(async group => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getMyBundlesStatus(group);

        // return { data: fetchMyBundlesStatusMockData }; // use for debugging
        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
