import { IGetActiveEmailBindingResponse } from 'multirpc-sdk';

import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export const {
  endpoints: { userSettingsGetActiveEmailBinding },
  useLazyUserSettingsGetActiveEmailBindingQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsGetActiveEmailBinding: build.query<
      IGetActiveEmailBindingResponse,
      ConditionallyNotifyingQueryFnParams<void> | void
    >({
      queryFn: createConditionallyNotifyingQueryFn(
        async (_args, { dispatch }) => {
          const service = MultiService.getService();

          const data = await service
            .getAccountGateway()
            .getActiveEmailBinding();

          dispatch(setAuthData({ email: data?.email }));

          return { data };
        },
      ),
    }),
  }),
});
