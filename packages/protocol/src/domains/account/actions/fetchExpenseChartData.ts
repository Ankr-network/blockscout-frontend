import {
  IAggregatedPaymentHistoryRequest as Request,
  IAggregatedPaymentHistoryResponse as Response,
} from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { fetchAllPaymentHistory } from '../utils/fetchAllPaymentHistory';
import { web3Api } from 'store/queries';

export const {
  useLazyAccountFetchExpenseChartDataQuery,
  endpoints: { accountFetchExpenseChartData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchExpenseChartData: build.query<Response, Request>({
      queryFn: createNotifyingQueryFn(async params => {
        const data = await fetchAllPaymentHistory(params);
        return { data };
      }),
    }),
  }),
});
