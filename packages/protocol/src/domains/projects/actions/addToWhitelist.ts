import { IApiUserGroupParams, UserEndpointTokenMode } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { projectApi } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

export interface AddToWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
  chainId: string;
  contractAddress: string;
  type?: UserEndpointTokenMode;
}

export const {
  endpoints: { addToWhitelist },
  useLazyAddToWhitelistQuery,
} = projectApi.injectEndpoints({
  endpoints: build => ({
    addToWhitelist: build.query<null, TwoFAQueryFnParams<AddToWhitelistParams>>(
      {
        queryFn: createQueryFnWithErrorHandler({
          queryFn: async ({
            params: {
              chainId,
              contractAddress,
              group,
              type = UserEndpointTokenMode.ADDRESS,
              userEndpointToken,
            },
            totp,
          }) => {
            const service = MultiService.getService().getAccountingGateway();

            await service.addAddressToWhitelist(
              contractAddress,
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
      },
    ),
  }),
});
