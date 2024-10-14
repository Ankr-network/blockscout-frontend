import { DisableTwoFAResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';

export interface IDisableTwoFAParams {
  totp: string;
}

export const {
  endpoints: { disableTwoFA },
  useDisableTwoFAMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    disableTwoFA: build.mutation<
      DisableTwoFAResponse,
      ConditionallyNotifyingQueryFnParams<IDisableTwoFAParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ totp }) => {
        const service = MultiService.getService();

        const data = await service.getAccountingGateway().disableTwoFA(totp);

        return { data };
      }),
    }),
  }),
});
