import { t } from '@ankr.com/common';
import { RequestAction, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import {
  ESDKErrorCodes,
  EthereumSSV,
  IStakeData,
  Web3KeyReadProvider,
} from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { TStore } from 'modules/common/types/ReduxRequests';
import { withStore } from 'modules/common/utils/withStore';
import { showNotification } from 'modules/notifications';

import { SSV_ACTIONS_PREFIX, SSV_PROVIDER_ID } from '../const';
import { RoutesConfig } from '../Routes';
import { TSSVToken } from '../types';

import { getStakeData } from './getStakeData';

type TStakeData = IStakeData | null;

interface IRes {
  data: TStakeData;
}

interface IStakeProps {
  amount: BigNumber;
  token: TSSVToken;
}

export const stake = createSmartAction<
  RequestAction<undefined, TStakeData>,
  [IStakeProps]
>(`${SSV_ACTIONS_PREFIX}stake`, ({ amount, token }) => ({
  request: {
    promise: async (store: RequestsStore): Promise<TStakeData> => {
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

      return EthereumSSV.stake({
        address,
        amount,
        provider,
      });
    },
  },
  meta: {
    asMutation: true,
    onError: (
      error: Error,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): Error => {
      const err = new Error(error.message);

      store.dispatchRequest(getStakeData());

      if (err.message.includes(ESDKErrorCodes.INSUFFICIENT_BALANCE)) {
        err.message = t('validation.insufficient-funds');
      }

      store.dispatch(
        showNotification({
          message: err.toString(),
          variant: 'error',
        }),
      );

      throw err;
    },
    onRequest: withStore,
    onSuccess: (
      response: IRes,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): IRes => {
      store.dispatchRequest(getStakeData());

      if (response?.data?.txHash) {
        const path = RoutesConfig.stakeStep.generatePath(
          token,
          response.data.txHash,
        );

        store.dispatch(push(path));
      }

      return response;
    },
  },
}));
