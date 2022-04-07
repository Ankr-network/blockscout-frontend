import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthSDK } from 'modules/api/EthSDK';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetCommonData {
  ethBalance: BigNumber;
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  minStake: BigNumber;
  aETHcRatio: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${ETH_ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await EthSDK.getInstance();

      const isFormatted = true;

      const [ethBalance, aETHbBalance, aETHcBalance, minStake, aETHcRatio] =
        await Promise.all([
          sdk.getEthBalance(),
          sdk.getAethbBalance(isFormatted),
          sdk.getAethcBalance(isFormatted),
          sdk.getMinStake(),
          sdk.getAethcRatio(isFormatted),
        ]);

      return {
        ethBalance,
        aETHbBalance,
        minStake,
        aETHcBalance,
        aETHcRatio,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));
