import { ISecretCodeLoginQueryParams } from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

// we don't know all possible responses from backend. but only this one is successful
const SUCCESS_REPSONSE_TEXT = 'OK';

export const {
  endpoints: { unbindLoginProvider },
  useUnbindLoginProviderMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    unbindLoginProvider: build.mutation<boolean, ISecretCodeLoginQueryParams>({
      invalidatesTags: [RequestType.BindingAccounts],
      queryFn: createNotifyingQueryFn(async args => {
        const service = MultiService.getService();

        const { result } = await service
          .getAccountingGateway()
          .unbindOauthAccount(args);

        return { data: result === SUCCESS_REPSONSE_TEXT };
      }),
    }),
  }),
  overrideExisting: true,
});
