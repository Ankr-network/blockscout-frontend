import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
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
    ...getEmailErrorConfig(),

    onRequest: () => ({
      promise: (async (): Promise<IEmailResponse[]> => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.getEmailBindings(filters);

        return response;
      })(),
    }),
  },
}));
