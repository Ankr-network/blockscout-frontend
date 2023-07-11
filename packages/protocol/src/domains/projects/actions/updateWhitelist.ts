import { IApiUserGroupParams } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

export interface UpdateWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
  chainId: string;
  contractAddress: string;
}

export const {
  useLazyUpdateWhitelistQuery,
  endpoints: { updateWhitelist },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateWhitelist: build.query<
      null,
      TwoFAQueryFnParams<UpdateWhitelistParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { userEndpointToken, chainId, contractAddress, group },
          totp,
        }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.updateWhitelist(
            [contractAddress],
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
