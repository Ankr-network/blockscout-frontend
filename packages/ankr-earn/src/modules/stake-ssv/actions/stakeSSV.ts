import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { store } from 'store';

import {
  ESDKErrorCodes,
  EthereumSSV,
  IStakeData,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getErrMsg } from 'modules/api/utils/getErrMsg';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { Token } from 'modules/common/types/token';

import { SSV_PROVIDER_ID, SSVCacheTags } from '../const';
import { RoutesConfig } from '../Routes';

type TStakeData = IStakeData | null;

interface IStakeProps {
  amount: BigNumber;
}

export const { useStakeSSVMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    stakeSSV: build.mutation<TStakeData, IStakeProps>({
      queryFn: queryFnNotifyWrapper<IStakeProps, never, TStakeData>(
        async ({ amount }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(store.getState());

          if (!address || !walletId) {
            return { data: null };
          }

          const provider = await providerManager.getProvider(
            SSV_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return { data: null };
          }

          return {
            data: await EthereumSSV.stake({
              address,
              amount,
              provider,
            }),
          };
        },
        error => {
          if (getErrMsg(error).includes(ESDKErrorCodes.INSUFFICIENT_BALANCE)) {
            return getExtendedErrorText(
              new Error(t('validation.insufficient-funds')),
              t('stake-ssv.errors.stake'),
            );
          }

          return getExtendedErrorText(error, t('stake-ssv.errors.stake'));
        },
      ),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          if (response?.data?.txHash) {
            const path = RoutesConfig.stakeStep.generatePath(
              Token.asETHc,
              response.data.txHash,
            );

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [SSVCacheTags.stakeData],
    }),
  }),
});
