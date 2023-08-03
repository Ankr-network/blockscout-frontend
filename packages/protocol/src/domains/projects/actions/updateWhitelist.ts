import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

import { WhiteListItem } from '../types';

export interface UpdateWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
  chainId: string;
  contractAddress: string;
  type?: WhiteListItem;
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
          params: {
            userEndpointToken,
            chainId,
            contractAddress,
            group,
            type = WhiteListItem.address,
          },
          totp,
        }) => {
          const service = MultiService.getService().getAccountGateway();

          await service.updateWhitelist(
            [contractAddress],
            {
              token: userEndpointToken,
              type,
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
