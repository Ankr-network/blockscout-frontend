import {
  IAggregatedPaymentHistoryResponse as Response,
  IAggregatedPaymentHistoryRequest as Request,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  useAccountFetchAggregatedPaymentHistoryQuery,
  endpoints: { accountFetchAggregatedPaymentHistory },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchAggregatedPaymentHistory: build.query<Response, Request>({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getAggregatedPaymentHistory(params);

        return { data };
      }),
    }),
  }),
});
