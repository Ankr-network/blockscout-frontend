import { isWriteProvider } from '@ankr.com/provider/providerManager/utils/isWriteProvider';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IHistoryData } from '../api/AnkrStakingSDK/types';
import { ANKR_ACTIONS_PREFIX } from '../const';

export const getHistoryData = createAction<
  RequestAction<IHistoryData[], IHistoryData[]>
>(`${ANKR_ACTIONS_PREFIX}getHistoryData`, () => ({
  request: {
    promise: (async (): Promise<IHistoryData[]> => {
      const sdk = await AnkrStakingSDK.getInstance();
      const provider = await sdk.getProvider();

      if (isWriteProvider(provider)) {
        return sdk.getAllEventsHistory(
          provider.currentAccount,
          await provider.getBlockNumber(),
        );
      }

      throw new Error('Current account is not defined');
    })(),
  },
  meta: {
    showNotificationOnError: true,
  },
}));
