import { t } from '@ankr.com/common';
import { push } from 'connected-react-router';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
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
        error => getExtendedErrorText(error, t('stake-ankr.errors.restake')),
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
