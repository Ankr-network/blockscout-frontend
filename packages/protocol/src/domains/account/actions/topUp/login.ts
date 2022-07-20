import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { tryToLogin } from 'domains/auth/utils/tryToLogin';
import { setAuthData } from 'domains/auth/store/authSlice';
import { connect } from 'domains/auth/actions/connect';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { fetchPublicKey } from '../fetchPublicKey';
import { IJwtToken } from 'multirpc-sdk';

interface IDeposit {
  address: string;
  credentials: IJwtToken;
}

export const login = createSmartAction<RequestAction<string, string>>(
  'topUp/login',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async (): Promise<any> => {
            const service = await MultiService.getInstance();
            const provider = service.getKeyProvider();
            const { currentAccount: address } = provider;

            const { data: publicKey } = await store.dispatchRequest(
              fetchPublicKey(),
            );

            const credentials = await tryToLogin(
              service,
              address,
              publicKey as string,
            );

            if (credentials) {
              store.dispatch(setAuthData({ credentials }));
            }

            store.dispatch(resetTransaction({ address }));

            return {
              address,
              credentials,
            };
          })(),
        };
      },
      asMutation: true,
      mutations: {
        [connect.toString()]: (
          data: ResponseData<typeof connect>,
          mutationData: IDeposit,
        ): ResponseData<typeof connect> => {
          return {
            ...data,
            ...mutationData,
          };
        },
      },
    },
  }),
);
