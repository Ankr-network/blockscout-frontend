import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult, AvailableWriteProviders } from 'provider';

import { EthSDK, TEthToken } from 'modules/api/EthSDK';
import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { getEth2SwapData } from './getEth2SwapData';

export interface ISwapAssetsArgs {
  amount: string;
  swapOption: TEthToken;
  ratio: BigNumber;
}

export const swapAssets = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [ISwapAssetsArgs]
>('eth2-swap/swapAssets', ({ swapOption, amount, ratio }: ISwapAssetsArgs) => ({
  request: {
    promise: async () => {
      const sdk = await EthSDK.getInstance();

      if (swapOption === Token.aETHb) {
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
      const { transactionHash, swapOption: option } = response.data || {};

      if (transactionHash && swapOption) {
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
