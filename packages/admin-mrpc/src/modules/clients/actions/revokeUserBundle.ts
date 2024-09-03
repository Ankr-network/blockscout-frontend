import { IRevokeBundleResponseItem, Web3Address } from 'multirpc-sdk';

import { AuthCacheTags, web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
  paymentId: string;
}

export const {
  useRevokeUserBundleMutation,
  endpoints: { revokeUserBundle },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    revokeUserBundle: build.mutation<
      IRevokeBundleResponseItem[],
      IRequestParams
    >({
      queryFn: async ({ address, paymentId }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const deleteResponse = await backofficeGateway.revokeUserBundle(
          address,
          paymentId,
        );

        return {
          data: deleteResponse,
        };
      },
      invalidatesTags: [AuthCacheTags.userBundlesData],
    }),
  }),
});
