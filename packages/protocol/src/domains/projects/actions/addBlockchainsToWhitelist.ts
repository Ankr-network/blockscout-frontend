import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

export interface AddBlockchainsToWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
  blockchains: BlockchainID[];
}

export const {
  endpoints: { addBlockchainsToWhitelist },
  useAddBlockchainsToWhitelistMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addBlockchainsToWhitelist: build.mutation<
      null,
      TwoFAQueryFnParams<AddBlockchainsToWhitelistParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { userEndpointToken, group, blockchains },
          totp,
        }) => {
          const service = MultiService.getService().getAccountingGateway();

          await service.addBlockchainsToWhitelist(
            blockchains,
            {
              token: userEndpointToken,
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
