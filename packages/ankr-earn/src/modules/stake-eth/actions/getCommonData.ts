import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetCommonData {
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  aETHcRatio: BigNumber;
  ethBalance: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${ETH_ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await EthereumSDK.getInstance();

      const isFormatted = true;

      const [ethBalance, aETHbBalance, aETHcBalance, aETHcRatio] =
        await Promise.all([
          sdk.getEthBalance(),
          sdk.getABBalance(isFormatted),
          sdk.getACBalance(isFormatted),
          sdk.getACRatio(isFormatted),
        ]);

      return {
        aETHbBalance,
        aETHcBalance,
        aETHcRatio,
        ethBalance,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
