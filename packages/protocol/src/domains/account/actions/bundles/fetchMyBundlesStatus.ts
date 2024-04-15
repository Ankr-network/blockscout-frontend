import { MyBundleStatus, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';

// import { fetchMyBundlesStatusMockData } from './fetchMyBundlesStatusMockData'; // use for debugging

interface IFetchMyBundlesStatusParams {
  group?: Web3Address;
}

export const {
  endpoints: { fetchMyBundlesStatus },
  useLazyFetchMyBundlesStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchMyBundlesStatus: build.query<
      MyBundleStatus[],
      IFetchMyBundlesStatusParams
    >({
      providesTags: [RequestType.MyBundles],
      queryFn: createNotifyingQueryFn(async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getMyBundlesStatus(group);

        // return { data: fetchMyBundlesStatusMockData }; // use for debugging
        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
