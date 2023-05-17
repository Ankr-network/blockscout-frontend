import { IEmailResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';

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
      ConditionallyNotifyingQueryFnParams<
        TwoFAQueryFnParams<AddNewEmailBindingParams>
      >
    >({
      queryFn: createConditionallyNotifyingQueryFn(
        async ({ params: { email }, totp }) => {
          const service = MultiService.getService();

          const data = await service
            .getAccountGateway()
            .addNewEmailBinding({ email, totp });

          return { data };
        },
      ),
    }),
  }),
});
