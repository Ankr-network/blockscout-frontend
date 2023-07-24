import { ConfirmTwoFAResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';

export interface IEnableTwoFAParams {
  totp: string;
}

export const {
  endpoints: { userSettingsConfirmTwoFA },
  useUserSettingsConfirmTwoFAQuery,
  useLazyUserSettingsConfirmTwoFAQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsConfirmTwoFA: build.query<
      ConfirmTwoFAResponse,
      ConditionallyNotifyingQueryFnParams<IEnableTwoFAParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ totp }) => {
        const service = MultiService.getService();

        const data = await service.getAccountGateway().confirmTwoFA({ totp });

        return { data };
      }),
    }),
  }),
});
