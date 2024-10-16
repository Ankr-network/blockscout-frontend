import { IBundlesStatusesResponse, Web3Address } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
}

export const {
  useFetchUserBundlesStatusesQuery,
  useLazyFetchUserBundlesStatusesQuery,
  endpoints: { fetchUserBundlesStatuses },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserBundlesStatuses: build.query<
      IBundlesStatusesResponse,
      IRequestParams
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const userBundles = await backofficeGateway.getUserBundlesStatuses(
          address,
        );

        return {
          data: userBundles,
        };
      },
      providesTags: [AuthCacheTags.userBundlesData],
    }),
  }),
});
