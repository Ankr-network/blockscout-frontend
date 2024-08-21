import { IBundlesResponse, Web3Address } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
  statuses?: string[];
}

export const {
  useFetchUserBundlesQuery,
  endpoints: { fetchUserBundles },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserBundles: build.query<IBundlesResponse, IRequestParams>({
      queryFn: async ({ address, statuses }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const userBundles = await backofficeGateway.getUserBundles(
          address,
          statuses,
        );

        return {
          data: userBundles,
        };
      },
      providesTags: [AuthCacheTags.userBundlesData],
    }),
  }),
});
