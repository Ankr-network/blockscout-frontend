import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { SupportedChainIDS } from 'modules/common/const';

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
      promise: (async (): Promise<void> => {
        const sdk = await BridgeSDK.getInstance();
        let watchAssetProps: Parameters<typeof sdk.provider.watchAsset>[0];

        const address = getTokenAddr(token, chainId);

        switch (token) {
          case AvailableBridgeTokens.aMATICb:
          default: {
            watchAssetProps = {
              type: 'ERC20',
              address,
              symbol: token,
              decimals: 18,
            };
            break;
          }
        }

        return sdk.provider.watchAsset(watchAssetProps);
      })(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: data => data,
    },
  }),
);
