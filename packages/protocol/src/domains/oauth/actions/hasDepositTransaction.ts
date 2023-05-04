import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { IApiUserGroupParams } from 'multirpc-sdk';

interface IOAuthHasDepositTransactionParams extends IApiUserGroupParams {
  shouldCheckVoucherTopUp?: boolean;
}

export const {
  endpoints: { oauthHasDepositTransaction },
  useOauthHasDepositTransactionQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthHasDepositTransaction: build.query<
      boolean,
      IOAuthHasDepositTransactionParams
    >({
      queryFn: async ({ shouldCheckVoucherTopUp, group }) => {
        const service = MultiService.getService();

        const { transactions } = await service
          .getAccountGateway()
          .getPaymentHistory({
            limit: 1,
            type: shouldCheckVoucherTopUp
              ? ['TRANSACTION_TYPE_DEPOSIT', 'TRANSACTION_TYPE_VOUCHER_TOPUP']
              : ['TRANSACTION_TYPE_DEPOSIT'],
            group,
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
