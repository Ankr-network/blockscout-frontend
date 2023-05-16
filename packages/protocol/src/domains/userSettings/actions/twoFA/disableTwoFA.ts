import { MultiService } from 'modules/api/MultiService';
import { DisableTwoFAResponse } from 'multirpc-sdk';
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
  useUserSettingDisableTwoFAQuery,
  useLazyUserSettingDisableTwoFAQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingDisableTwoFA: build.query<
      DisableTwoFAResponse,
      ConditionallyNotifyingQueryFnParams<IDisableTwoFAParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ totp }) => {
        const service = MultiService.getService();

        const data = await service.getAccountGateway().disableTwoFA(totp);

        return { data };
      }),
    }),
  }),
});
