import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

import { MATIC_ETH_ACTIONS_PREFIX } from '../const';

import { getStakeGasFee } from './getStakeGasFee';

interface IApproveMATICStakeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

interface IRes {
  data: boolean;
}

export const approveMATICStake = createSmartAction<
  RequestAction<boolean, boolean>,
  [IApproveMATICStakeProps]
>(`${MATIC_ETH_ACTIONS_PREFIX}approveMATICStake`, ({ amount, token }) => ({
  request: {
    promise: (async (): Promise<boolean> => {
      const sdk = await PolygonOnEthereumSDK.getInstance();

      return sdk.approveMATICToken(amount);
    })(),
  },
  meta: {
    showNotificationOnError: true,
    onSuccess: (
      response: IRes,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ): IRes => {
      store.dispatchRequest(
        getStakeGasFee({
          amount,
          token,
        }),
      );

      return response;
    },
  },
}));
