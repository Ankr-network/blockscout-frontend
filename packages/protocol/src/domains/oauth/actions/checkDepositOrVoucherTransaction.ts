import { hasVoucherTransactionAndBalanceIsGreaterThanZero as oauthHasVoucherTransactionAndBalanceIsGreaterThanZero } from './hasVoucherTransactionAndBalanceIsGreaterThanZero';
import { oauthHasDepositTransaction } from './hasDepositTransaction';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export interface CheckDepositOrVoucherTransactionResult {
  hasDepositTransaction: boolean;
  hasTransaction: boolean;
  hasVoucherTransaction: boolean;
}

export const {
  endpoints: { checkDepositOrVoucherTransaction },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkDepositOrVoucherTransaction: build.query<
      CheckDepositOrVoucherTransactionResult,
      void
    >({
      queryFn: async (_args, { dispatch }) => {
        const [
          { data: hasDepositTransaction = false },
          { data: hasVoucherTransaction = false },
        ] = await Promise.all([
          dispatch(oauthHasDepositTransaction.initiate()),
          dispatch(
            oauthHasVoucherTransactionAndBalanceIsGreaterThanZero.initiate(),
          ),
        ]);

        const hasTransaction = hasDepositTransaction || hasVoucherTransaction;

        if (hasTransaction) {
          dispatch(
            setAuthData({
              hasDepositTransaction,
              hasVoucherTransactionAndBalanceIsGreaterThanZero:
                hasVoucherTransaction,
            }),
          );
        }

        return {
          data: {
            hasDepositTransaction,
            hasTransaction,
            hasVoucherTransaction,
          },
        };
      },
    }),
  }),
});
