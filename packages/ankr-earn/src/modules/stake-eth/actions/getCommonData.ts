import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthSDK } from 'modules/api/EthSDK';
import { Token } from 'modules/common/types/token';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetCommonData {
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  aETHcRatio: BigNumber;
  claimableAETHB: BigNumber;
  claimableAETHC: BigNumber;
  ethBalance: BigNumber;
  minStake: BigNumber;
}

export const getCommonData = createAction<
  RequestAction<IGetCommonData, IGetCommonData>
>(`${ETH_ACTIONS_PREFIX}getCommonData`, () => ({
  request: {
    promise: (async (): Promise<IGetCommonData> => {
      const sdk = await EthSDK.getInstance();

      const isFormatted = true;

      const [
        ethBalance,
        aETHbBalance,
        aETHcBalance,
        minStake,
        aETHcRatio,
        claimableAETHB,
        claimableAETHC,
      ] = await Promise.all([
        sdk.getEthBalance(),
        sdk.getAethbBalance(isFormatted),
        sdk.getAethcBalance(isFormatted),
        sdk.getMinStake(),
        sdk.getAethcRatio(isFormatted),
        sdk.getClaimable(Token.aETHb),
        sdk.getClaimable(Token.aETHc),
      ]);

      return {
        aETHbBalance,
        aETHcBalance,
        aETHcRatio,
        claimableAETHB,
        claimableAETHC,
        ethBalance,
        minStake,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    getData: data => data,
  },
}));
