import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

interface IUnstakeArgs {
  amount: BigNumber;
}

export const { useUnstakeSUIMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeSUI: build.mutation<BigNumber, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, BigNumber>(
        async ({ amount }) => {
          return { data: amount };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { transactionHash } = response.data;

          if (transactionHash) {
            const path = RoutesConfig.unstakeSuccess.generatePath(
              response.data.transactionHash,
            );

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
