import { IApiUserGroupParams, WhitelistItem } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

export interface AddItemToWhitelistParams
  extends Omit<WhitelistItem, 'list'>,
    IApiUserGroupParams {
  item: string;
  userEndpointToken: string;
}

export const {
  endpoints: { addAddressToWhitelist },
  useAddAddressToWhitelistMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    addAddressToWhitelist: build.mutation<
      null,
      TwoFAQueryFnParams<AddItemToWhitelistParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { blockchain, group, item, type, userEndpointToken: token },
          totp,
        }) => {
          const api = MultiService.getService().getAccountingGateway();

          await api.addAddressToWhitelist(
            item,
            { blockchain, group, token, type },
            totp,
          );

          return { data: null };
        },
        errorHandler: error => ({ error }),
      }),
    }),
  }),
  overrideExisting: true,
});
