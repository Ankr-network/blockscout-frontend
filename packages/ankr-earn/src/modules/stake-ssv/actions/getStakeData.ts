import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import { EthereumSSV } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { withStore } from 'modules/common/utils/withStore';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';

type TGetStakeData = IGetStakeData | null;

interface IGetStakeData {
  asETHcBalance: BigNumber;
  asETHcRatio: BigNumber;
  ethBalance: BigNumber;
  minStakeAmount: BigNumber;
}

const { getASETHCBalance, getASETHCRatio, getETHBalance, getMinStakeAmount } =
  EthereumSSV;

export const getStakeData = createAction<
  RequestAction<undefined, TGetStakeData>
>(`${SSV_ACTIONS_PREFIX}getStakeData`, () => ({
  request: {
    promise: async (store: RequestsStore): Promise<TGetStakeData> => {
      const providerManager = getProviderManager();

      const { address, walletId } = selectEthProviderData(store.getState());

      if (!address || !walletId) {
        return null;
      }

      const provider = await providerManager.getProvider(
        SSV_PROVIDER_ID,
        walletId,
      );

      if (!(provider instanceof Web3KeyReadProvider)) {
        return null;
      }

      const [asETHcBalance, asETHcRatio, ethBalance, minStakeAmount] =
        await Promise.all([
          getASETHCBalance({
            address,
            provider,
          }),
          getASETHCRatio({
            provider,
          }),
          getETHBalance({
            address,
            provider,
          }),
          getMinStakeAmount({
            provider,
          }),
        ]);

      return {
        asETHcBalance,
        asETHcRatio,
        ethBalance,
        minStakeAmount,
      };
    },
  },
  meta: {
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));
