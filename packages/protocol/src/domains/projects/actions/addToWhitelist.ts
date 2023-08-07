import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

import { WhiteListItem } from '../types';

export interface AddToWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
  chainId: string;
  contractAddress: string;
  type?: WhiteListItem;
}

export const {
  useLazyAddToWhitelistQuery,
  endpoints: { addToWhitelist },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addToWhitelist: build.query<null, TwoFAQueryFnParams<AddToWhitelistParams>>(
      {
        queryFn: createQueryFnWithErrorHandler({
          queryFn: async ({
            params: {
              userEndpointToken,
              group,
              chainId,
              contractAddress,
              type = WhiteListItem.address,
            },
            totp,
          }) => {
            const service = MultiService.getService().getAccountGateway();

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
