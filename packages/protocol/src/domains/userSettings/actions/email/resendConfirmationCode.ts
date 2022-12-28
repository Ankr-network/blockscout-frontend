import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface IResendConfirmationCodeParams {
  email: string;
}

export const {
  endpoints: { userSettingsResendConfirmationCode },
  useLazyUserSettingsResendConfirmationCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsResendConfirmationCode: build.query<
      string,
      ConditionallyNotifyingQueryFnParams<IResendConfirmationCodeParams>
    >({
      queryFn: createConditionallyNotifyingQueryFn(async ({ email }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .resendConfirmationCode(email);

        return { data };
      }),
    }),
  }),
});
