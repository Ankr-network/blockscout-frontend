import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { EthereumSDK } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

import { ETH_ACTIONS_PREFIX } from '../const';

export interface IGetClaimableData {
  claimableAETHB: BigNumber;
  claimableAETHC: BigNumber;
}

export const getClaimableData = createAction<
  RequestAction<IGetClaimableData, IGetClaimableData>
>(`${ETH_ACTIONS_PREFIX}getClaimableData`, () => ({
  request: {
    promise: (async (): Promise<IGetClaimableData> => {
      const sdk = await EthereumSDK.getInstance();

      const [claimableAETHB, claimableAETHC] = await Promise.all([
        sdk.getClaimable(Token.aETHb),
        sdk.getClaimable(Token.aETHc),
      ]);

      return {
        claimableAETHB,
        claimableAETHC,
      };
    })(),
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
  },
}));
