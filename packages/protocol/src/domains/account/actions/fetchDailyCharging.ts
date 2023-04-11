import { IDailyChargingParams, IDailyChargingResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  useLazyAccountFetchDailyChargingQuery,
  endpoints: { accountFetchDailyCharging },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchDailyCharging: build.query<
      IDailyChargingResponse,
      IDailyChargingParams
    >({
      queryFn: createNotifyingQueryFn(async (params, { getState }) => {
        const group = getSelectedGroupAddress(getState as GetState);
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getDailyCharging({ ...params, group });

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
