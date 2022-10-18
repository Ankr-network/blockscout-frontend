import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWeb3SendResult } from '@ankr.com/provider-core';

import { MultiService } from 'modules/api/MultiService';

export const getLastLockedFundsEvent = createSmartAction<
  RequestAction<IWeb3SendResult, null>
>('topUp/getLastLockedFundsEvent', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: () => {
      return {
        promise: (async (): Promise<any | undefined> => {
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          return service.getLastLockedFundsEvent(address);
        })(),
      };
    },
  },
}));
