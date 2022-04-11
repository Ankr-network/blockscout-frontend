import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult, AvailableWriteProviders } from 'provider';

import { EthSDK } from 'modules/api/EthSDK';
import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { getSwitcherData } from './getSwitcherData';

export interface ISwapAssetsArgs {
  amount: string;
  from: Token;
  to: Token;
  ratio: BigNumber;
}

export const swapAssets = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [ISwapAssetsArgs]
>('switcher/swapAssets', ({ from, to, amount, ratio }: ISwapAssetsArgs) => ({
  request: {
    promise: async () => {
      const sdk = await EthSDK.getInstance();

      if (from === Token.aETHb) {
        const inputValue = new BigNumber(amount)
          .multipliedBy(ratio)
          .dividedBy(ETH_SCALE_FACTOR)
          .decimalPlaces(18, BigNumber.ROUND_HALF_DOWN)
          .toString(10);

        const result = await sdk.unlockShares({
          amount: inputValue,
        });

        return { ...result, from, to };
      }

      const result = await sdk.lockShares({
        amount,
      });

      return { ...result, from, to };
    },
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onRequest: withStore,
    getData: data => data,
    onSuccess: async (response, _action, store) => {
      const {
        transactionHash,
        from: optionFrom,
        to: optionTo,
      } = response.data || {};

      if (transactionHash && optionFrom && optionTo) {
        store.dispatch(push(`${optionFrom}/${optionTo}/${transactionHash}`));
      }

      store.dispatchRequest(
        getSwitcherData({
          providerId: AvailableWriteProviders.ethCompatible,
        }),
      );

      return response;
    },
  },
}));

export const approve = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('switcher/approve', () => ({
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
        getSwitcherData({ providerId: AvailableWriteProviders.ethCompatible }),
      );

      return response;
    },
  },
}));
