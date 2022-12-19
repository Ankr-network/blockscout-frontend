import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IConfirmEmailBindingParams {
  code: string;
  email: string;
  shouldNotify?: boolean;
}

export const confirmEmailBinding = createSmartAction<
  RequestAction<IEmailResponse>,
  [IConfirmEmailBindingParams]
>(
  'userSettings/confirmEmailBinding',
  ({ code, email, shouldNotify = true }) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      cache: false,
      takeLatest: true,
      hideNotificationOnError: !shouldNotify,
      onRequest: () => ({
        promise: (async (): Promise<IEmailResponse> => {
          const service = MultiService.getService();

          const response = await service
            .getAccountGateway()
            .confirmEmailBinding(email, code);

          return response;
        })(),
      }),
    },
  }),
);
