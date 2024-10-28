import {
  ReplaceWhitelistBody,
  ReplaceWhitelistParams as ReplaceWhitelistQuery,
  ReplaceWhitelistResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

export interface ReplaceWhitelistParams extends ReplaceWhitelistQuery {
  whitelist: ReplaceWhitelistBody;
}

export const {
  endpoints: { replaceWhitelist },
  useReplaceWhitelistMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    replaceWhitelist: build.mutation<
      ReplaceWhitelistResponse,
      TwoFAQueryFnParams<ReplaceWhitelistParams>
    >({
      invalidatesTags: [RequestType.ProjectWhitelist],
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { group, mode, token, whitelist },
          totp,
        }) => {
          const api = MultiService.getService().getAccountingGateway();

          const data = await api.replaceWhitelist(
            { group, mode, token },
            whitelist,
            totp,
          );

          return { data };
        },
      }),
    }),
  }),
});
