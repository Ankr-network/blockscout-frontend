import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK } from '@ankr.com/staking-sdk';

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
      const sdk = await EthereumSDK.getInstance();

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
        sdk.getABBalance(isFormatted),
        sdk.getACBalance(isFormatted),
        sdk.getMinimumStake(),
        sdk.getACRatio(isFormatted),
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
