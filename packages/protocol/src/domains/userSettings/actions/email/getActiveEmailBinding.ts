import { IGetActiveEmailBindingResponse } from 'multirpc-sdk';

import {
  ConditionallyNotifyingQueryFnParams,
  createConditionallyNotifyingQueryFn,
} from 'store/utils/createConditionallyNotifyingQueryFn';
import { MultiService } from 'modules/api/MultiService';
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
      queryFn: createConditionallyNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getActiveEmailBinding();

        return { data };
      }),
    }),
  }),
});
