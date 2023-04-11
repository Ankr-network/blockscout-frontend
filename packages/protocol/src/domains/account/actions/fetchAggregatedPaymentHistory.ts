import {
  IAggregatedPaymentHistoryResponse as Response,
  IAggregatedPaymentHistoryRequest as Request,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  useAccountFetchAggregatedPaymentHistoryQuery,
  endpoints: { accountFetchAggregatedPaymentHistory },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchAggregatedPaymentHistory: build.query<Response, Request>({
      queryFn: createNotifyingQueryFn(async (params, { getState }) => {
        const group = getSelectedGroupAddress(getState as GetState);
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getAggregatedPaymentHistory({ ...params, group });

        return { data };
      }),
    }),
  }),
});
