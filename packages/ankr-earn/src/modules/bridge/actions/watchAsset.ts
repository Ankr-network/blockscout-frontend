import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { ITokenInfo } from '@ankr.com/provider';

import { ETH_DECIMALS, SupportedChainIDS } from 'modules/common/const';
import { getTokenSymbol } from 'modules/common/utils/getTokenSymbol';

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
          symbol: getTokenSymbol(token),
          decimals: ETH_DECIMALS,
          chainId,
        };

        return sdk.provider.addTokenToWallet(tokenInfo);
      })(),
    },
    meta: {
      showNotificationOnError: true,
      additionalErrorText: t('bridge.errors.add-token-to-wallet', { token }),
    },
  }),
);
