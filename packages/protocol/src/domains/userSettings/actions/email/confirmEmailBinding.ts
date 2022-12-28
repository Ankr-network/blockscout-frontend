import { IEmailResponse } from 'multirpc-sdk';

import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface ConfirmEmailBindingParams {
  code: string;
  email: string;
}

export const {
  endpoints: { userSettingsConfirmEmailBinding },
  useLazyUserSettingsConfirmEmailBindingQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsConfirmEmailBinding: build.query<
      IEmailResponse,
      ConditionallyNotifyingQueryFnParams<ConfirmEmailBindingParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ email, code }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .confirmEmailBinding(email, code);

        return { data };
      }),
    }),
  }),
});
