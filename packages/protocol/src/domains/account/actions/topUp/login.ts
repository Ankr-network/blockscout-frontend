import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { tryToLogin } from 'modules/auth/utils/tryToLogin';
import { setAuthData } from 'modules/auth/store/authSlice';
import { connect } from 'modules/auth/actions/connect';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { IDeposit } from 'modules/auth/actions/deposit';
import {
  setAmount,
  setTopUpTransaction,
} from 'domains/account/store/accountSlice';
import { fetchPublicKey } from './fetchPublicKey';

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
            const { service } = MultiService.getInstance();
            const address = service.getKeyProvider().currentAccount();

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

            store.dispatch(setTopUpTransaction());
            store.dispatch(setAmount(new BigNumber(0)));

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
