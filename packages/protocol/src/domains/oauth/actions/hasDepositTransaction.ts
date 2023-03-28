import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

export const {
  endpoints: { oauthHasDepositTransaction },
  useOauthHasDepositTransactionQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthHasDepositTransaction: build.query<boolean, boolean | void>({
      queryFn: async shouldCheckVoucherTopUp => {
        const service = MultiService.getService();

        const { transactions } = await service
          .getAccountGateway()
          .getPaymentHistory({
            limit: 1,
            type: shouldCheckVoucherTopUp
              ? ['TRANSACTION_TYPE_DEPOSIT', 'TRANSACTION_TYPE_VOUCHER_TOPUP']
              : ['TRANSACTION_TYPE_DEPOSIT'],
          });

        return {
          data: Boolean(
            Array.isArray(transactions) && transactions?.length > 0,
          ),
        };
      },
    }),
  }),
});
