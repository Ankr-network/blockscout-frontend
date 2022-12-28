import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

export const {
  endpoints: { oauthHasDepositTransaction },
  useOauthHasDepositTransactionQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthHasDepositTransaction: build.query<boolean, void>({
      queryFn: async () => {
        const service = MultiService.getService();

        const { transactions } = await service
          .getAccountGateway()
          .getPaymentHistory({
            limit: 1,
            type: ['TRANSACTION_TYPE_DEPOSIT'],
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
