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
  endpoints: { userSettingDisableTwoFA },
  useLazyUserSettingDisableTwoFAQuery,
  useUserSettingDisableTwoFAQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingDisableTwoFA: build.query<
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
