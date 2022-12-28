import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { EthereumSSV, Web3KeyReadProvider } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { ZERO } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
}

export const getStakeGasFee = createSmartAction<
  RequestAction<undefined, BigNumber>,
  [IGetStakeGasFeeProps]
>(`${SSV_ACTIONS_PREFIX}getStakeGasFee`, ({ amount }) => ({
  request: {
    promise: async (store: RequestsStore): Promise<BigNumber> => {
      const providerManager = getProviderManager();

      const { address, walletId } = selectEthProviderData(store.getState());

      if (!address || !walletId) {
        return ZERO;
      }

      const provider = await providerManager.getProvider(
        SSV_PROVIDER_ID,
        walletId,
      );

      if (!(provider instanceof Web3KeyReadProvider)) {
        return ZERO;
      }

      return EthereumSSV.getStakeGasFee({
        address,
        amount,
        provider,
      });
    },
  },
  meta: {
    onRequest: withStore,
    showNotificationOnError: true,
  },
}));
