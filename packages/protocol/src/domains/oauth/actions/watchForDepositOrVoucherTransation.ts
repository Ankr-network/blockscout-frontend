import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { oauthHasDepositTransaction } from './hasDepositTransaction';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { EthAddressType } from 'multirpc-sdk';
import { hasVoucherTransactionAndBalanceIsGreaterThanZero as oauthHasVoucherTransactionAndBalanceIsGreaterThanZero } from './hasVoucherTransactionAndBalanceIsGreaterThanZero';
import { watchForVoucherTransactionAndNegativeBalance } from './watchForVoucherTransactionAndNegativeBalance';

export const {
  endpoints: { watchForDepositOrVoucherTransation },
  useLazyWatchForDepositOrVoucherTransationQuery,
  useWatchForDepositOrVoucherTransationQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    watchForDepositOrVoucherTransation: build.query<boolean, void>({
      queryFn: async (_args, { getState, dispatch }) => {
        const {
          // oauth
          hasDepositTransaction,
          hasOauthLogin,
          ethAddressType,

          // web3
          hasWeb3Connection,
          isInstantJwtParticipant,
        } = selectAuthData(getState() as RootState);

        const shouldNotWatchForTransactionOauthUser =
          hasDepositTransaction ||
          !hasOauthLogin ||
          ethAddressType === EthAddressType.User;

        const shouldNotWatchForTransactionWeb3User =
          !hasWeb3Connection || !isInstantJwtParticipant;

        if (
          shouldNotWatchForTransactionOauthUser &&
          shouldNotWatchForTransactionWeb3User
        ) {
          return { data: true };
        }

        let inProcess = true;

        while (inProcess) {
          const newAuthData = selectAuthData(getState() as RootState);

          if (!newAuthData.hasOauthLogin && !newAuthData.hasWeb3Connection) {
            break;
          }

          const [
            { data: hasDepositTransactionNew },
            { data: hasVoucherTransaction },
            // eslint-disable-next-line
          ] = await Promise.all([
            dispatch(oauthHasDepositTransaction.initiate()),
            dispatch(
              oauthHasVoucherTransactionAndBalanceIsGreaterThanZero.initiate(),
            ),
          ]);

          const hasTransaction =
            hasDepositTransactionNew || hasVoucherTransaction;

          inProcess = !hasTransaction;

          if (hasTransaction) {
            dispatch(
              setAuthData({
                hasDepositTransaction: hasDepositTransactionNew,
                hasVoucherTransactionAndBalanceIsGreaterThanZero:
                  hasVoucherTransaction,
              }),
            );

            if (hasVoucherTransaction) {
              dispatch(watchForVoucherTransactionAndNegativeBalance.initiate());
            }

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
