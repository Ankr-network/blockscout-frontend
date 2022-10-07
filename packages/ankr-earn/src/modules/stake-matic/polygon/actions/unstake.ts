import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getCommonData } from './getCommonData';
import { getUnstakeStats } from './getUnstakeStats';

interface IUnstakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const unstake = createSmartAction<
  RequestAction<void, void>,
  [IUnstakeProps]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}unstake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk = await PolygonOnPolygonSDK.getInstance();

      return sdk.unstake(amount, token);
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onError: (
      error: Error,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): Error => {
      store.dispatchRequest(getCommonData());
      store.dispatchRequest(getUnstakeStats());

      throw error;
    },
    onSuccess: async (
      response,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ) => {
      await response.data?.receiptPromise;

      store.dispatchRequest(getCommonData());
      store.dispatchRequest(getUnstakeStats());

      if (response.data.transactionHash) {
        const path = RoutesConfig.unstakeSuccess.generatePath(
          token,
          response.data.transactionHash,
        );

        store.dispatch(push(path));
      }

      return response;
    },
  },
}));
