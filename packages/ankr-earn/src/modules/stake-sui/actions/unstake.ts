import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { RootState } from 'store';
import { SUI_PROVIDER_ID } from 'sui';

import { IStakeData, Web3KeyWriteProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { unstake } from '../api';
import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';

type TStakeData = IStakeData | null;

interface IUnstakeArgs {
  amount: BigNumber;
}

export const { useUnstakeSUIMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeSUI: build.mutation<TStakeData, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, TStakeData>(
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
            data: await unstake(),
          };
        },
        error => getExtendedErrorText(error, t('stake-sui.errors.unstake')),
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          if (response.data?.txHash) {
            const path = RoutesConfig.unstakeSuccess.generatePath({
              txHash: response.data.txHash,
            });

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
