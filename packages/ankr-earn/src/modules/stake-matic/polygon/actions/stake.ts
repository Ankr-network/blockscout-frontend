import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IStakeData, MaticPolygonSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_POLYGON_ACTIONS_PREFIX } from '../const';
import { RoutesConfig } from '../Routes';

import { getStakeStats } from './getStakeStats';

interface IRes {
  data: IStakeData;
}

interface IStakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const stake = createSmartAction<
  RequestAction<IStakeData, IStakeData>,
  [IStakeProps]
>(`${MATIC_POLYGON_ACTIONS_PREFIX}/stake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<IStakeData> => {
      const sdk = await MaticPolygonSDK.getInstance();

      return sdk.stake(amount, token);
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
      store.dispatchRequest(getStakeStats());

      throw error;
    },
    onSuccess: (
      response: IRes,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): IRes => {
      store.dispatchRequest(getStakeStats());

      if (response.data.txHash) {
        const path = RoutesConfig.stakeStep.generatePath(
          token,
          response.data.txHash,
        );

        store.dispatch(push(path));
      }

      return response;
    },
  },
}));
