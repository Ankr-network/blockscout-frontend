import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { EthAddressType } from 'multirpc-sdk';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';

export const {
  endpoints: { oauthWatchForTheVoucherTransactionAndNegativeBalance },
  useLazyOauthWatchForTheVoucherTransactionAndNegativeBalanceQuery,
  useOauthWatchForTheVoucherTransactionAndNegativeBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthWatchForTheVoucherTransactionAndNegativeBalance: build.query<
      boolean,
      void
    >({
      queryFn: async (_args, { getState, dispatch }) => {
        const authData = selectAuthData(getState() as RootState);

        if (
          !authData.hasVoucherTransaction ||
          !authData.hasOauthLogin ||
          authData.ethAddressType === EthAddressType.User
        ) {
          return { data: true };
        }

        let inProcess = true;

        while (inProcess) {
          const newAuthData = selectAuthData(getState() as RootState);

          if (!newAuthData.hasOauthLogin) {
            break;
          }

          // eslint-disable-next-line
          const balance = await dispatch(
            accountFetchBalance.initiate(),
          ).unwrap();

          const isBalanceLessThanNull =
            balance?.voucherBalance?.isLessThanOrEqualTo(0);

          inProcess = !isBalanceLessThanNull;

          if (isBalanceLessThanNull) {
            dispatch(
              setAuthData({
                hasOauthUserDepositTransaction: false,
                hasVoucherTransaction: false,
              }),
            );
            break;
          } else {
            // eslint-disable-next-line
            await timeout(20_000);
          }
        }

        return { data: true };
      },
    }),
  }),
});
