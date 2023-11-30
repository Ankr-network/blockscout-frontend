import { UserEndpointTokenMode, Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { TwoFAQueryFnParams } from 'store/queries/types';

interface UpdateWhitelistModeParams {
  userEndpointToken: string;
  prohibitByDefault: boolean;
  groupAddress?: Web3Address;
}

export const {
  useLazyUpdateWhitelistModeQuery,
  endpoints: { updateWhitelistMode },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateWhitelistMode: build.query<
      null,
      TwoFAQueryFnParams<UpdateWhitelistModeParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({
          params: { userEndpointToken, prohibitByDefault, groupAddress },
          totp,
        }) => {
          const service = MultiService.getService().getAccountingGateway();

          await service.updateWhitelistMode(
            {
              whitelist: true,
              prohibit_by_default: prohibitByDefault,
            },
            {
              group: groupAddress,
              token: userEndpointToken,
              type: UserEndpointTokenMode.ADDRESS,
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
