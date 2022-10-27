import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';

import { TxHash } from 'modules/common/types';
import { resetForm } from 'modules/forms/store/formsSlice';

import { web3Api } from '../../api/web3Api';
import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { CacheTags } from '../cacheTags';
import { ANKR_STAKE_FORM_ID } from '../const';
import { RoutesConfig } from '../RoutesConfig';

interface IStakeArgs {
  amount: BigNumber;
  provider: string;
}

export const { useStakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stake: build.mutation<TxHash, IStakeArgs>({
      queryFn: async ({ amount, provider }) => {
        const sdk = await AnkrStakingSDK.getInstance();

        return { data: await sdk.delegate(provider, amount) };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const txHash = response.data;

          if (txHash) {
            dispatch(resetForm(ANKR_STAKE_FORM_ID));

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
      invalidatesTags: [CacheTags.common, CacheTags.history],
    }),
  }),
});
