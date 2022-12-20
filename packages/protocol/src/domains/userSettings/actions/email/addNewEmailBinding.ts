import { IEmailResponse } from 'multirpc-sdk';

import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

interface AddNewEmailBindingParams {
  email: string;
  shouldNotify?: boolean;
}

export const {
  useLazyUserSettingsAddNewEmailBindingQuery,
  endpoints: { userSettingsAddNewEmailBinding },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsAddNewEmailBinding: build.query<
      IEmailResponse,
      ConditionallyNotifyingQueryFnParams<AddNewEmailBindingParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ email }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .addNewEmailBinding(email);

        return { data };
      }),
    }),
  }),
});
