import { IEmailResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';

interface EditEmailBindingParams {
  email: string;
}

export const {
  endpoints: { userSettingsEditEmailBinding },
  useLazyUserSettingsEditEmailBindingQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsEditEmailBinding: build.query<
      IEmailResponse,
      ConditionallyNotifyingQueryFnParams<
        TwoFAQueryFnParams<EditEmailBindingParams>
      >
    >({
      queryFn: createConditionallyNotifyingQueryFn(
        async ({ params: { email }, totp }) => {
          const service = MultiService.getService();

          const data = await service.getAccountingGateway().editEmailBinding({
            email,
            totp,
          });

          return { data };
        },
      ),
    }),
  }),
});
