import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { RootState } from 'store';

import {
  IUnstakeData,
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { CacheTags, XDC_PROVIDER_ID } from '../const';
import { RoutesConfig } from '../Routes';

type TUnstakeData = IUnstakeData | null;

interface IUnstakeProps {
  amount: BigNumber;
}

export const { useUnstakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstake: build.mutation<TUnstakeData, IUnstakeProps>({
      queryFn: queryFnNotifyWrapper<IUnstakeProps, never, TUnstakeData>(
        async ({ amount }, { getState }) => {
          const providerManager = ProviderManagerSingleton.getInstance();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: null,
            };
          }

          const provider = await providerManager.getProvider(
            XDC_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: null,
            };
          }

          return {
            data: await XDC.unstake({
              address,
              amount,
              provider,
            }),
          };
        },
      ),
      onQueryStarted: (args, { dispatch, queryFulfilled }) =>
        queryFulfilled.then(({ data }) => {
          if (!data?.txHash) {
            return;
          }

          const path = RoutesConfig.unstakeSuccess.generatePath(data.txHash);

          dispatch(push(path));
        }),
      invalidatesTags: [CacheTags.unstakeData],
    }),
  }),
});
