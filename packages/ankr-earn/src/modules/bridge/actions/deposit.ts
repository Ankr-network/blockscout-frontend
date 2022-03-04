import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

interface IDepositArgs {
  amount: BigNumber;
  token: AvailableBridgeTokens;
  fromChainId: SupportedChainIDS;
  toChainId: SupportedChainIDS;
}

export interface IBridgeDepositRes {
  transactionHash: string;
  amount: BigNumber;
}

export const deposit = createSmartAction<
  RequestAction<IBridgeDepositRes, IBridgeDepositRes>,
  [IDepositArgs]
>('bridge/deposit', ({ amount, token, fromChainId, toChainId }) => ({
  request: {
    promise: (async (): Promise<IBridgeDepositRes> => {
      const sdk = await BridgeSDK.getInstance();
      const fromToken = getTokenAddr(token, fromChainId);
      const depositResponse = await sdk.deposit(amount, fromToken, toChainId);
      const { transactionHash, receiptPromise } = depositResponse;
      await receiptPromise;

      return { transactionHash, amount };
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => data,
  },
}));
