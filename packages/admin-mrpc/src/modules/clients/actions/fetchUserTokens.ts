import { IUserTokensRequest, IUserTokensResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useLazyFetchUserTokensQuery,
  endpoints: { fetchUserTokens },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTokens: build.query<IUserTokensResponse, IUserTokensRequest>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const response = await backofficeGateway.getUserTokens({
          address,
        });

        return {
          data: response || [],
        };
      },
    }),
  }),
  overrideExisting: true,
});
