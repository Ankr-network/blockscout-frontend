import { push } from 'connected-react-router';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TxHash } from 'modules/common/types';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { RoutesConfig } from '../RoutesConfig';

interface IRestakeArgs {
  provider: string;
}

export const { useRestakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    restake: build.mutation<TxHash, IRestakeArgs>({
      queryFn: queryFnNotifyWrapper<IRestakeArgs, never, TxHash>(
        async ({ provider }) => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.redelegate(provider) };
        },
      ),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const txHash = response.data;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.stakeSteps.generatePath({
                  txHash,
                }),
              ),
            );
          }
        });
      },
    }),
  }),
});
