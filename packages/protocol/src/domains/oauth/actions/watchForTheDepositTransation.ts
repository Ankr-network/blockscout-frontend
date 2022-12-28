import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { oauthHasDepositTransaction } from './hasDepositTransaction';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { EthAddressType } from 'multirpc-sdk';

export const {
  endpoints: { oauthWatchForTheDepositTransation },
  useLazyOauthWatchForTheDepositTransationQuery,
  useOauthWatchForTheDepositTransationQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthWatchForTheDepositTransation: build.query<boolean, void>({
      queryFn: async (_args, { getState, dispatch }) => {
        const authData = selectAuthData(getState() as RootState);

        if (
          authData?.hasOauthUserDepositTransaction ||
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
          const { data: hasTransaction } = await dispatch(
            oauthHasDepositTransaction.initiate(),
          );

          inProcess = !hasTransaction;

          if (hasTransaction) {
            dispatch(
              setAuthData({
                hasOauthUserDepositTransaction: hasTransaction,
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
