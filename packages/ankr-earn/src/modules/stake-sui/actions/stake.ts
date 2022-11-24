import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

interface IStakeArgs {
  amount: BigNumber;
}

export const { useStakeSUIMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeSUI: build.mutation<BigNumber, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, BigNumber>(
        async ({ amount }) => {
          return { data: amount };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { txHash } = response.data;

          if (txHash) {
            dispatch(
              push(
                RoutesConfig.stakeStep.generatePath({
                  txHash: response.data.txHash,
                }),
              ),
            );
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
