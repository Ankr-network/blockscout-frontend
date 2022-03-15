import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult, AvailableWriteProviders } from 'provider';

import { ETH_SCALE_FACTOR, featuresConfig } from 'modules/common/const';
import { withStore } from 'modules/common/utils/withStore';

import { EthSDK } from '../api/sdk';
import { TSwapOption } from '../types';

import { getEth2SwapData } from './getEth2SwapData';

export interface ISwapAssetsArgs {
  amount: string;
  swapOption: TSwapOption;
  ratio: BigNumber;
}

export const swapAssets = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [ISwapAssetsArgs]
>('eth2-swap/swapAssets', ({ swapOption, amount, ratio }: ISwapAssetsArgs) => ({
  request: {
    promise: async () => {
      const sdk = await EthSDK.getInstance();

      if (swapOption === 'aETHb') {
        const inputValue = new BigNumber(amount)
          .multipliedBy(ratio)
          .dividedBy(ETH_SCALE_FACTOR)
          .decimalPlaces(18, BigNumber.ROUND_HALF_DOWN)
          .toString(10);

        const result = await sdk.unlockShares({
          amount: inputValue,
        });

        return { ...result, swapOption };
      }

      const result = await sdk.lockShares({
        amount,
      });

      return { ...result, swapOption };
    },
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onRequest: withStore,
    getData: data => data,
    onSuccess: async (response, _action, store) => {
      const {
        receiptPromise,
        transactionHash,
        swapOption: option,
      } = response.data || {};

      if (!featuresConfig.progressStep) {
        await receiptPromise.catch((error: Error) => {
          response.error = error;
        });
      }

      if (transactionHash && swapOption && !response.error) {
        store.dispatch(
          push(`/earn/switch/success/${transactionHash}/${option}`),
        );
      }

      store.dispatchRequest(
        getEth2SwapData({
          providerId: AvailableWriteProviders.ethCompatible,
        }),
      );

      return response;
    },
  },
}));

export interface IApproveAETHCArgs {
  providerId: AvailableWriteProviders;
}

export const approveAETHC = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('eth2-swap/approveAETHC', () => ({
  request: {
    promise: async () => {
      const sdk = await EthSDK.getInstance();

      return sdk.approveAETHCForAETHB();
    },
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onRequest: withStore,
    getData: data => data,
    onSuccess: async (response, _action, store) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(
        getEth2SwapData({ providerId: AvailableWriteProviders.ethCompatible }),
      );

      return response;
    },
  },
}));
