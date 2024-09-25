import { PaymentHistory, PaymentHistoryParams } from 'domains/account/types';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { loadPaymentHistory } from '../utils/loadPaymentHistory';
import { mapTransactionsWithTxReceiptData } from '../utils/loadPaymentHistory/mapTransactionsWithTxReceiptData';

export const {
  endpoints: { fetchPaymentHistory },
  useLazyFetchPaymentHistoryQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPaymentHistory: build.query<PaymentHistory, PaymentHistoryParams>({
      queryFn: createNotifyingQueryFn(async params => {
        const data = await loadPaymentHistory(params);

        const updatedTransactions = await mapTransactionsWithTxReceiptData(
          data.list,
        );

        return {
          data: {
            ...data,
            list: updatedTransactions,
          },
        };
      }),
      onQueryStarted: async (
        { isPaginationRequest },
        { dispatch, getCacheEntry, queryFulfilled },
      ) => {
        if (isPaginationRequest) {
          const { data: { list: loaded = [] } = {}, endpointName } =
            getCacheEntry();

          const {
            data: {
              deductionsCursor,
              list: loading = [],
              transactionsCursor,
            } = {},
          } = await queryFulfilled;

          const newState = {
            deductionsCursor,
            list: [...loaded, ...loading],
            transactionsCursor,
          };

          dispatch(
            web3Api.util.updateQueryData(
              endpointName as unknown as never,
              undefined as unknown as never,
              state => {
                Object.assign(state, newState);
              },
            ),
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectData: selectPaymentHistory,
  selectLoading: selectPaymentHistoryLoading,
  selectState: selectPaymentHistoryState,
} = createQuerySelectors({ endpoint: fetchPaymentHistory });
