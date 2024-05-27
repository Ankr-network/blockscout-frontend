import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';

import { GetState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';
import { ANKR_TOP_UP_NETWORK } from 'modules/billing/const';

export interface Deposit {
  address: string;
  credentials?: IJwtToken;
  workerTokenData?: WorkerTokenData;
}

export const {
  useLazyTopUpLoginQuery,
  endpoints: { topUpLogin },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpLogin: build.query<Deposit | null, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(
          async ({ web3Service }, { getState, dispatch }) => {
            const address = getCurrentTransactionAddress(getState as GetState);

            const { jwtToken: credentials, workerTokenData } =
              await web3Service.issueJwtToken(address, ANKR_TOP_UP_NETWORK);

            if (credentials) {
              dispatch(setAuthData({ credentials, workerTokenData }));
            }

            dispatch(resetTransaction({ address }));

            return {
              data: {
                address,
                credentials,
                workerTokenData,
              },
            };
          },
        ),
        fallback: { data: null },
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            'authMakeAuthorization' as unknown as never,
            undefined as unknown as never,
            connectData => {
              Object.assign(connectData, data);
            },
          ),
        );
      },
    }),
  }),
});
