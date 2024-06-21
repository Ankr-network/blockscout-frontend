import {
  IAggregatedPaymentHistoryRequest as Request,
  IAggregatedPaymentHistoryResponse as Response,
} from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { fetchAllPaymentHistory } from '../utils/fetchAllPaymentHistory';

export const {
  endpoints: { accountFetchExpenseChartData },
  useLazyAccountFetchExpenseChartDataQuery,
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
