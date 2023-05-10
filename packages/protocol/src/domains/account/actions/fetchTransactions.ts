import { PaymentHistory, PaymentHistoryParams } from 'domains/account/types';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { loadPaymentHistory } from '../utils/loadPaymentHistory';
import { web3Api } from 'store/queries';

export const {
  endpoints: { accountFetchPaymentHistory },
  useLazyAccountFetchPaymentHistoryQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchPaymentHistory: build.query<
      PaymentHistory,
      PaymentHistoryParams
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const data = await loadPaymentHistory(params);

        return { data };
      }),
      onQueryStarted: async (
        _args,
        { dispatch, queryFulfilled, getCacheEntry },
      ) => {
        const { data: { list: loaded = [] } = {}, endpointName } =
          getCacheEntry();

        const {
          data: {
            list: loading = [],
            deductionsCursor,
            transactionsCursor,
          } = {},
        } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            endpointName as unknown as never,
            undefined as unknown as never,
            state => {
              Object.assign(state, {
                deductionsCursor,
                list: [...loaded, ...loading],
                transactionsCursor,
              });
            },
          ),
        );
      },
    }),
  }),
});
