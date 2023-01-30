import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';

export const {
  endpoints: { oauthHasVoucherTransaction },
  useOauthHasVoucherTransactionQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthHasVoucherTransaction: build.query<boolean, void>({
      queryFn: async (_args, { dispatch }) => {
        const service = MultiService.getService();

        const { transactions } = await service
          .getAccountGateway()
          .getPaymentHistory({
            limit: 1,
            type: ['TRANSACTION_TYPE_VOUCHER_TOPUP'],
          });

        const hasTransaction = Boolean(
          Array.isArray(transactions) && transactions?.length > 0,
        );

        const balance = await dispatch(accountFetchBalance.initiate()).unwrap();

        return {
          data: hasTransaction && balance?.voucherBalance?.isGreaterThan(0),
        };
      },
    }),
  }),
});
