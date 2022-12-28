import { IEmailResponse } from 'multirpc-sdk';

import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

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
      ConditionallyNotifyingQueryFnParams<EditEmailBindingParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ email }) => {
        const service = MultiService.getService();

        const data = await service.getAccountGateway().editEmailBinding(email);

        return { data };
      }),
    }),
  }),
});
