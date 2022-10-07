import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { IWeb3SendResult } from '@ankr.com/provider';
import { BinanceSDK } from '@ankr.com/staking-sdk';

import { TStore } from 'modules/common/types/ReduxRequests';

import { REFERRALS_ACTIONS_PREFIX } from '../api/const';

import { getPartnerData } from './getPartnerData';
import { getStakersData } from './getStakersData';

export const claimBNBRewards = createSmartAction<
  RequestAction<IWeb3SendResult, IWeb3SendResult>,
  [string]
>(`${REFERRALS_ACTIONS_PREFIX}claimBNBRewards`, code => ({
  request: {
    promise: (async (): Promise<IWeb3SendResult> => {
      const sdk: BinanceSDK = await BinanceSDK.getInstance();

      return sdk.claimPartnerRewards();
    })(),
  },
  meta: {
    asMutation: true,
    showNotificationOnError: true,
    onSuccess: async (
      response,
      _action: RequestAction,
      store: TStore<IStoreState>,
    ) => {
      store.dispatchRequest(getPartnerData(code));
      store.dispatchRequest(getStakersData(code));

      return response;
    },
  },
}));
