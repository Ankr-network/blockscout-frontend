import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  endpoints: { hasVoucherTransactionAndBalanceIsGreaterThanZero },
  useHasVoucherTransactionAndBalanceIsGreaterThanZeroQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    hasVoucherTransactionAndBalanceIsGreaterThanZero: build.query<
      boolean,
      void
    >({
      queryFn: async (_args, { dispatch, getState }) => {
        const service = MultiService.getService();
        const group = getSelectedGroupAddress(getState as GetState);

        const { transactions } = await service
          .getAccountGateway()
          .getPaymentHistory({
            limit: 1,
            type: ['TRANSACTION_TYPE_VOUCHER_TOPUP'],
            group,
          });

        const hasTransaction = Boolean(
          Array.isArray(transactions) && transactions?.length > 0,
        );

        const balance = await dispatch(accountFetchBalance.initiate()).unwrap();

        return {
          data: hasTransaction && balance?.creditBalance?.isGreaterThan(0),
        };
      },
    }),
  }),
});
