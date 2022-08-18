import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IResendConfirmationCodeParams {
  email: string;
}

export const resendConfirmationCode = createSmartAction<
  RequestAction<IEmailResponse, IEmailResponse>,
  [IResendConfirmationCodeParams]
>('userSettings/resendConfirmationCode', ({ email }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    ...getEmailErrorConfig(),

    onRequest: () => ({
      promise: (async (): Promise<string> => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.resendConfirmationCode(email);

        return response;
      })(),
    }),
  },
}));
