import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { accountFetchBalance } from 'domains/account/actions/balance/fetchBalance';
import { IApiUserGroupParams } from 'multirpc-sdk';

export const {
  endpoints: { watchForVoucherTransactionAndNegativeBalance },
  useLazyWatchForVoucherTransactionAndNegativeBalanceQuery,
  useWatchForVoucherTransactionAndNegativeBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    watchForVoucherTransactionAndNegativeBalance: build.query<
      boolean,
      IApiUserGroupParams
    >({
      queryFn: async ({ group }, { getState, dispatch }) => {
        const authData = selectAuthData(getState() as RootState);

        if (
          !authData.authorizationToken ||
          !authData.hasVoucherTransactionAndBalanceIsGreaterThanZero ||
          authData.hasDepositTransaction ||
          authData.credentials
        ) {
          return { data: true };
        }

        let inProcess = true;

        while (inProcess) {
          const newAuthData = selectAuthData(getState() as RootState);

          if (
            !newAuthData.authorizationToken ||
            !newAuthData.hasVoucherTransactionAndBalanceIsGreaterThanZero ||
            newAuthData.hasDepositTransaction ||
            newAuthData.credentials
          ) {
            break;
          }

          // eslint-disable-next-line
          const balance = await dispatch(
            accountFetchBalance.initiate({ group }),
          ).unwrap();

          inProcess = Boolean(balance?.creditBalance?.isGreaterThan(0));

          if (!inProcess) {
            dispatch(
              setAuthData({
                hasVoucherTransactionAndBalanceIsGreaterThanZero: false,
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
