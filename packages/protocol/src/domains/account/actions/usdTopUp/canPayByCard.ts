import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const canPayByCard = createSmartAction<RequestAction<string>>(
  'usdTopUp/canPayByCard',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      onRequest: () => {
        return {
          promise: (async (): Promise<boolean> => {
            const service = await MultiService.getInstance();

            const { isEligible } = await service
              .getAccountGateway()
              .canPayByCard();

            return isEligible;
          })(),
        };
      },
    },
  }),
);
