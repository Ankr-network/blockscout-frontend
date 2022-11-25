import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { selectAuthData } from 'domains/auth/store/authSlice';
import { withStore } from 'domains/auth/utils/withStore';
import { MultiService } from 'modules/api/MultiService';

export const autoLogin = createSmartAction<RequestAction>(
  'oauth/autoLogin',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        const {
          credentials,
          authorizationToken,
          workerTokenData,
          address,
          email,
        } = selectAuthData(store.getState());

        const service = MultiService.getService();
        const web3ReadService = await MultiService.getWeb3ReadService();

        web3ReadService
          .getOauthGateway()
          .addToken(authorizationToken as string);
        service.getAccountGateway().addToken(authorizationToken as string);

        if (workerTokenData?.signedToken) {
          service.getWorkerGateway().addJwtToken(workerTokenData?.signedToken);
        }

        return {
          credentials,
          authorizationToken,
          workerTokenData,
          email,
          address,
        };
      },
    },
    meta: {
      onRequest: withStore,
    },
  }),
);
