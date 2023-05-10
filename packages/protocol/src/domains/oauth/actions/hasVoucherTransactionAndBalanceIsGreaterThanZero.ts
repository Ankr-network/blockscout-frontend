import { IApiUserGroupParams } from 'multirpc-sdk';
import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';

export const {
  endpoints: { hasVoucherTransactionAndBalanceIsGreaterThanZero },
  useHasVoucherTransactionAndBalanceIsGreaterThanZeroQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    hasVoucherTransactionAndBalanceIsGreaterThanZero: build.query<
      boolean,
      IApiUserGroupParams
    >({
      queryFn: async ({ group }, { dispatch }) => {
        const service = MultiService.getService();

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

        const balance = await dispatch(
          accountFetchBalance.initiate({ group }),
        ).unwrap();

        return {
          data: hasTransaction && balance?.creditBalance?.isGreaterThan(0),
        };
      },
    }),
  }),
});
