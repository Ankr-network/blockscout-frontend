import { ISecretCodeLoginQueryParams } from 'multirpc-sdk';

import { RequestType, web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';

// we don't know all possible responses from backend. but only this one is successful
const SUCCESS_REPSONSE_TEXT = 'OK';

export const {
  endpoints: { unbindLoginProvider },
  useUnbindLoginProviderMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    unbindLoginProvider: build.mutation<
      boolean,
      ConditionallyNotifyingQueryFnParams<
        TwoFAQueryFnParams<ISecretCodeLoginQueryParams>
      >
    >({
      invalidatesTags: [RequestType.BindingAccounts],
      queryFn: createConditionallyNotifyingQueryFn(async ({ params, totp }) => {
        const service = MultiService.getService();

        const { result } = await service
          .getAccountingGateway()
          .unbindOauthAccount(params, totp);

        return { data: result === SUCCESS_REPSONSE_TEXT };
      }),
    }),
  }),
  overrideExisting: true,
});
