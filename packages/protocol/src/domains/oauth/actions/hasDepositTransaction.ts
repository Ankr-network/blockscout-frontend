import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  endpoints: { oauthHasDepositTransaction },
  useOauthHasDepositTransactionQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthHasDepositTransaction: build.query<boolean, boolean | void>({
      queryFn: async (shouldCheckVoucherTopUp, { getState }) => {
        const service = MultiService.getService();
        const group = getSelectedGroupAddress(getState as GetState);

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
