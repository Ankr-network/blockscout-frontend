import { IDailyChargingParams, IDailyChargingResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  useLazyAccountFetchDailyChargingQuery,
  endpoints: { accountFetchDailyCharging },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchDailyCharging: build.query<
      IDailyChargingResponse,
      IDailyChargingParams
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const data = await service.getAccountGateway().getDailyCharging(params);

        return { data };
      }),
    }),
  }),
});
