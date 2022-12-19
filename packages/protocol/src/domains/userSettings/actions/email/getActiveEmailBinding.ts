import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse, IGetActiveEmailBindingResponse } from 'multirpc-sdk';
import { setAuthData } from 'domains/auth/store/authSlice';

export interface ActiveEmailBindingParams {
  notify?: boolean;
}

export const getActiveEmailBinding = createSmartAction<
  RequestAction<IEmailResponse, IGetActiveEmailBindingResponse>
>(
  'userSettings/getActiveEmailBinding',
  ({ notify = true }: ActiveEmailBindingParams = {}) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      cache: false,
      asMutation: false,
      takeLatest: true,
      hideNotificationOnError: !notify,
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => ({
        promise: (async (): Promise<IGetActiveEmailBindingResponse> => {
          const service = MultiService.getService();

          const response = await service
            .getAccountGateway()
            .getActiveEmailBinding();

          store.dispatch(
            setAuthData({
              email: response?.email,
            }),
          );

          return response;
        })(),
      }),
    },
  }),
);
