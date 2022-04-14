import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { IWeb3SendResult } from 'provider';

import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import { AvailableSwitchNetwork, SWITCHER_TO_TOKENS } from '../const';

import { getSwitcherData } from './getSwitcherData';

export interface ISwapAssetsArgs {
  amount: string;
  from: Token;
  to: Token;
  ratio: BigNumber;
  chainId: AvailableSwitchNetwork;
}

export const swapAssets = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [ISwapAssetsArgs]
>(
  'switcher/swapAssets',
  ({ from, to, amount, ratio, chainId }: ISwapAssetsArgs) => ({
    request: {
      promise: async () => {
        const sdk = await SwitcherSDK.getInstance();

        const isCertificate = SWITCHER_TO_TOKENS.includes(from);
        const value = new BigNumber(amount);

        const result = await (isCertificate
          ? sdk.lockShares({ chainId, amount: value })
          : sdk.unlockShares({ amount: value, ratio, chainId }));

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

        store.dispatchRequest(getSwitcherData({ chainId }));

        return response;
      },
    },
  }),
);

export interface IApproveArgs {
  chainId: AvailableSwitchNetwork;
}

export const approve = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('switcher/approve', ({ chainId }: IApproveArgs) => ({
  request: {
    promise: async () => {
      const sdk = await SwitcherSDK.getInstance();

      return sdk.approve({ chainId });
    },
    chainId,
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onRequest: withStore,
    getData: data => data,
    onSuccess: async (response, _action, store) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(getSwitcherData({ chainId }));

      return response;
    },
  },
}));
