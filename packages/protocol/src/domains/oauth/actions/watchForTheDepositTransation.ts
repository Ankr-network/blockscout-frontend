import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { timeout } from 'modules/common/utils/timeout';
import { oauthHasDepositTransaction } from './hasDepositTransaction';
import { web3Api } from 'store/queries';
import { RootState } from 'store';
import { EthAddressType } from 'multirpc-sdk';
import { oauthHasVoucherTransaction } from './hasVoucherTransaction';

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
          const [
            { data: hasDepositTransaction },
            { data: hasVoucherTransaction },
            // eslint-disable-next-line
          ] = await Promise.all([
            dispatch(oauthHasDepositTransaction.initiate()),
            dispatch(oauthHasVoucherTransaction.initiate()),
          ]);

          const hasTransaction = hasDepositTransaction || hasVoucherTransaction;

          inProcess = !hasTransaction;

          if (hasTransaction) {
            dispatch(
              setAuthData({
                hasOauthUserDepositTransaction: hasTransaction,
                hasVoucherTransaction,
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
