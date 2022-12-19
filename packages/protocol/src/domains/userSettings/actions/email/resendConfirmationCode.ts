import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IResendConfirmationCodeParams {
  email: string;
  shouldNotify?: boolean;
}

export const resendConfirmationCode = createSmartAction<
  RequestAction<IEmailResponse, IEmailResponse>,
  [IResendConfirmationCodeParams]
>('userSettings/resendConfirmationCode', ({ email, shouldNotify = true }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    hideNotificationOnError: !shouldNotify,
    onRequest: () => ({
      promise: (async (): Promise<string> => {
        const service = MultiService.getService();

        const response = await service
          .getAccountGateway()
          .resendConfirmationCode(email);

        return response;
      })(),
    }),
  },
}));
