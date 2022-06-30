import { IWeb3SendResult } from '@ankr.com/provider';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction } from 'redux-smart-actions';

import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { SwitcherSDK } from '../api/SwitcherSDK';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  SWITCHER_TO_TOKENS,
} from '../const';

import { getSwitcherData } from './getSwitcherData';

export interface ISwapAssetsArgs {
  amount: string;
  from: Token;
  to: Token;
  ratio: BigNumber;
  chainId: AvailableSwitchNetwork;
}

interface RequestError extends Error {
  code?: number;
}

const METAMASK_USER_REJECT_ERROR_CODE = 4001;

const onError = (error: RequestError) => {
  const [message] = error.message.split('\n');

  throw error.code !== METAMASK_USER_REJECT_ERROR_CODE
    ? new Error(message || error.message)
    : new Error('');
};

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
        const params = {
          amount: new BigNumber(amount),
          chainId,
          token: from as AvailableSwitcherToken,
        };

        const result = await (isCertificate
          ? sdk.lockShares(params)
          : sdk.unlockShares({ ...params, ratio }));

        return { ...result, from, to };
      },
    },
    meta: {
      asMutation: true,
      showNotificationOnError: false,
      onRequest: withStore,
      onError,
      onSuccess: async (response, _action, store) => {
        const {
          transactionHash,
          from: optionFrom,
          to: optionTo,
        } = response.data || {};

        if (transactionHash && optionFrom && optionTo) {
          store.dispatch(push(`${optionFrom}/${optionTo}/${transactionHash}`));
        }

        store.dispatchRequest(getSwitcherData({ chainId, token: optionFrom }));

        return response;
      },
    },
  }),
);

export interface IApproveArgs {
  chainId: AvailableSwitchNetwork;
  token: AvailableSwitcherToken;
}

export const approve = createAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>
>('switcher/approve', ({ chainId, token }: IApproveArgs) => ({
  request: {
    promise: async () => {
      const sdk = await SwitcherSDK.getInstance();

      return sdk.approve({ chainId, token });
    },
    chainId,
  },
  meta: {
    asMutation: true,
    showNotificationOnError: false,
    onRequest: withStore,
    onError,
    onSuccess: async (response, _action, store) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(getSwitcherData({ chainId, token }));

      return response;
    },
  },
}));
