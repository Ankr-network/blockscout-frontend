import { EthAddressType } from 'multirpc-sdk';

import { RootState } from 'store';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { checkDepositOrVoucherTransaction } from './checkDepositOrVoucherTransaction';
import {
  selectHasPremium,
  selectHasPrivateAccess,
} from 'domains/auth/store/selectors';
import { watchForVoucherTransactionAndNegativeBalance } from './watchForVoucherTransactionAndNegativeBalance';
import { web3Api } from 'store/queries';

const checkFreemiumUserWatching = (state: RootState) =>
  !(selectHasPremium(state) && selectHasPrivateAccess(state));

export const {
  endpoints: { watchForDepositOrVoucherTransation },
  useLazyWatchForDepositOrVoucherTransationQuery,
  useWatchForDepositOrVoucherTransationQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    watchForDepositOrVoucherTransation: build.query<boolean, void>({
      queryFn: async (_args, { getState, dispatch }) => {
        const state = getState() as RootState;
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

        const shouldNotWatchForTransactionFreemiumUser =
          checkFreemiumUserWatching(state);

        const shouldNotWatch =
          (shouldNotWatchForTransactionOauthUser &&
            shouldNotWatchForTransactionWeb3User) ||
          shouldNotWatchForTransactionFreemiumUser;

        if (shouldNotWatch) {
          return { data: true };
        }

        let inProcess = true;

        while (inProcess) {
          const newAuthData = selectAuthData(getState() as RootState);

          if (!newAuthData.hasOauthLogin && !newAuthData.hasWeb3Connection) {
            break;
          }

          const {
            data: {
              hasTransaction = false,
              hasVoucherTransaction = false,
            } = {},
            // eslint-disable-next-line no-await-in-loop
          } = await dispatch(checkDepositOrVoucherTransaction.initiate());

          inProcess = !hasTransaction;

          if (hasTransaction) {
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
