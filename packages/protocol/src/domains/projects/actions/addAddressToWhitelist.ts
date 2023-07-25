import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

import { UpdateWhitelistParams } from './updateWhitelist';

export const {
  useLazyAddAddressToWhitelistQuery,
  endpoints: { addAddressToWhitelist },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addAddressToWhitelist: build.query<
      null,
      TwoFAQueryFnParams<UpdateWhitelistParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { userEndpointToken, chainId, contractAddress, group },
          totp,
        }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.addAddressToWhitelist(
            contractAddress,
            {
              token: userEndpointToken,
              type: 'address',
              blockchain: chainId,
              group,
            },
            totp,
          );

          return { data: null };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
