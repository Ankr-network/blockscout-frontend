import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from 'provider';

import { TStore } from 'modules/common/types/ReduxRequests';
import { Token } from 'modules/common/types/token';
import { BinanceSDK } from 'modules/stake-bnb/api/BinanceSDK';
import { RoutesConfig } from 'modules/swap/Routes';

export const swapOldAETHCBSC = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [BigNumber]
>('dashboard/swapOldAETHCBSC', amount => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk: BinanceSDK = await BinanceSDK.getInstance();

      return sdk.swapOldAETHC(amount);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onSuccess: (
      response,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ) => {
      if (response.data?.transactionHash) {
        store.dispatch(
          push(
            RoutesConfig.main.generatePath(
              Token.aETHc,
              response.data.transactionHash,
            ),
          ),
        );
      }

      return response;
    },
  },
}));
