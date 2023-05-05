import {
  EthAddressType,
  GroupUserRole,
  IApiUserGroupParams,
} from 'multirpc-sdk';

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

interface IRequestParams extends IApiUserGroupParams {
  userGroupRole?: GroupUserRole;
}

const checkFreemiumUserWatching = (state: RootState) =>
  !(selectHasPremium(state) && selectHasPrivateAccess(state));

export const {
  endpoints: { watchForDepositOrVoucherTransation },
  useLazyWatchForDepositOrVoucherTransationQuery,
  useWatchForDepositOrVoucherTransationQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    watchForDepositOrVoucherTransation: build.query<boolean, IRequestParams>({
      queryFn: async ({ group, userGroupRole }, { getState, dispatch }) => {
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

        const shouldNotWatchForTransactionDevRole =
          userGroupRole === GroupUserRole.dev;

        const shouldNotWatch =
          (shouldNotWatchForTransactionOauthUser &&
            shouldNotWatchForTransactionWeb3User) ||
          shouldNotWatchForTransactionDevRole ||
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
          } = await dispatch(
            checkDepositOrVoucherTransaction.initiate({ group }),
          );

          inProcess = !hasTransaction;

          if (hasTransaction) {
            if (hasVoucherTransaction) {
              dispatch(
                watchForVoucherTransactionAndNegativeBalance.initiate({
                  group,
                }),
              );
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
