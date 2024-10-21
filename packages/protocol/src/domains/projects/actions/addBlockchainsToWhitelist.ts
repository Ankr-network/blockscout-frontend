import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

function prepareChains(chain: string) {
  if (chain === 'btc_mainnet') return 'btc';

  return chain;
}

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
      invalidatesTags: [
        RequestType.WhitelistBlockchains,
        RequestType.WhitelistsBlockchains,
      ],
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { blockchains, group, userEndpointToken },
          totp,
        }) => {
          const service = MultiService.getService().getAccountingGateway();

          const preparedChains = blockchains.map(prepareChains);

          await service.addBlockchainsToWhitelist(
            preparedChains,
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
