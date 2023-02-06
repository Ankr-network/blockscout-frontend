import { t } from '@ankr.com/common';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { BSC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { withStore } from 'modules/common/utils/withStore';

import { DashboardSDK } from '../api/DashboardSDK';

export const fetchAETHCBridged = createAction<
  RequestAction<undefined, BigNumber>
>('dashboard/fetchAETHCBridged', () => ({
  request: {
    promise: async (): Promise<BigNumber> => {
      const sdk = await DashboardSDK.getInstance();

      return sdk.getBalance({
        token: Token.aETHc,
        networkID: BSC_NETWORK_BY_ENV,
      });
    },
  },
  meta: {
    asMutation: false,
    showNotificationOnError: true,
    additionalErrorText: t('dashboard.errors.bridged-eth-cert'),
    onRequest: withStore,
  },
}));
