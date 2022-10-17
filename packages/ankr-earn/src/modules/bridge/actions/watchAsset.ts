import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ITokenInfo } from 'common';

import { ETH_DECIMALS, SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

interface IWatchAssetArgs {
  token: AvailableBridgeTokens;
  chainId: SupportedChainIDS;
}

export interface IBridgeWatchAsset {
  type: 'ERC20';
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
}

export const watchAsset = createSmartAction<RequestAction, [IWatchAssetArgs]>(
  'bridge/watchAsset',
  ({ token, chainId }) => ({
    request: {
      promise: (async (): Promise<boolean> => {
        const sdk = await BridgeSDK.getInstance();

        const tokenInfo: ITokenInfo = {
          address: getTokenAddr(token, chainId),
          symbol: token,
          decimals: ETH_DECIMALS,
          chainId,
        };

        return sdk.provider.addTokenToWallet(tokenInfo);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
