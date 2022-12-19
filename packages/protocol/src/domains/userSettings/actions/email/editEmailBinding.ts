import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IEditEmailBindingParams {
  email: string;
  shouldNotify?: boolean;
}

export const editEmailBinding = createSmartAction<
  RequestAction<IEmailResponse>,
  [IEditEmailBindingParams]
>('userSettings/editEmailBinding', ({ email, shouldNotify = true }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    hideNotificationOnError: !shouldNotify,
    onRequest: () => ({
      promise: (async (): Promise<IEmailResponse> => {
        const service = MultiService.getService();

        const response = await service
          .getAccountGateway()
          .editEmailBinding(email);

        return response;
      })(),
    }),
  },
}));
