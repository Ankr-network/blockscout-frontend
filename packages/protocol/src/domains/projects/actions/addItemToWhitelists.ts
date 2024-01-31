import { IApiUserGroupParams, UserEndpointTokenMode } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { RequestType, web3Api } from 'store/queries';

export interface AddItemToWhitelistsParams extends IApiUserGroupParams {
  blockchains: string[];
  item: string;
  userEndpointToken: string;
  type: UserEndpointTokenMode;
}

export const {
  endpoints: { addItemToWhitelists },
  useAddItemToWhitelistsMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addItemToWhitelists: build.mutation<
      null,
      TwoFAQueryFnParams<AddItemToWhitelistsParams>
    >({
      invalidatesTags: [RequestType.ProjectWhitelist],
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { blockchains, group, item, type, userEndpointToken: token },
          totp,
        }) => {
          const api = MultiService.getService().getAccountingGateway();

          const promises = blockchains.map(blockchain =>
            api.addAddressToWhitelist(
              item,
              { blockchain, group, token, type },
              totp,
            ),
          );

          await Promise.all(promises);

          return { data: null };
        },
        errorHandler: error => ({ error }),
      }),
    }),
  }),
  overrideExisting: true,
});
