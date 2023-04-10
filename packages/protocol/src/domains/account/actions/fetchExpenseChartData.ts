import {
  IAggregatedPaymentHistoryRequest as Request,
  IAggregatedPaymentHistoryResponse as Response,
} from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { fetchAllPaymentHistory } from '../utils/fetchAllPaymentHistory';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  useLazyAccountFetchExpenseChartDataQuery,
  endpoints: { accountFetchExpenseChartData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchExpenseChartData: build.query<Response, Request>({
      queryFn: createNotifyingQueryFn(async (params, { getState }) => {
        const group = getSelectedGroupAddress(getState as GetState);
        const data = await fetchAllPaymentHistory({ ...params, group });

        return { data };
      }),
    }),
  }),
});
