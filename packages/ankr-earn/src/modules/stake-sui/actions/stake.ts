import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { RootState } from 'store';
import { SUI_PROVIDER_ID } from 'sui';

import { IStakeData, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { stake } from '../api';
import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

type TStakeData = IStakeData | null;

interface IStakeArgs {
  amount: BigNumber;
}

export const { useStakeSUIMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeSUI: build.mutation<TStakeData, IStakeArgs>({
      queryFn: queryFnNotifyWrapper<IStakeArgs, never, TStakeData>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: null,
            };
          }

          const provider = await providerManager.getProvider(
            SUI_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyWriteProvider)) {
            return {
              data: null,
            };
          }

          return {
            data: await stake(),
          };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          if (response.data?.txHash) {
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
