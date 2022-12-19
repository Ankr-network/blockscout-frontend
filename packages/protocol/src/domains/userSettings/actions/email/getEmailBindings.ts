import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { EmailConfirmationStatus, IEmailResponse } from 'multirpc-sdk';

export const getEmailBindings = createSmartAction<
  RequestAction<IEmailResponse[], IEmailResponse[]>,
  [EmailConfirmationStatus?]
>('userSettings/getEmailBindings', filters => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    onRequest: () => ({
      promise: (async (): Promise<IEmailResponse[]> => {
        const service = MultiService.getService();

        const response = await service
          .getAccountGateway()
          .getEmailBindings(filters);

        return response;
      })(),
    }),
  },
}));
