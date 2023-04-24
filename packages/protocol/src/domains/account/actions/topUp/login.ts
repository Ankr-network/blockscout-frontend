import { IJwtToken, WorkerTokenData } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';
import { GetState } from 'store';

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
    topUpLogin: build.query<Deposit, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const service = await MultiService.getWeb3Service();

        const address = await getCurrentTransactionAddress(
          getState as GetState,
        );

        const { jwtToken: credentials, workerTokenData } =
          await service.issueJwtToken(address);

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
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(
          web3Api.util.updateQueryData(
            'authConnect' as unknown as never,
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
