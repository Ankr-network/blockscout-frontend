import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { walletConnectionGuard } from 'modules/auth/utils/walletConnectionGuard';
import { tryToLogin } from 'modules/auth/utils/tryToLogin';
import { setAuthData } from 'modules/auth/store/authSlice';
import { connect } from 'modules/auth/actions/connect';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { IDeposit } from 'modules/auth/actions/deposit';
import {
  setAmount,
  setTopUpTransaction,
} from 'domains/account/store/accountSlice';
import { fetchPublicKeyAgain } from './fetchPublicKeyAgain';

export const login = createSmartAction<RequestAction<string, string>>(
  'topUp/login',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        const { service } = MultiService.getInstance();
        const address = service.getKeyProvider().currentAccount();

        const { data: publicKey } = getQuery(store.getState(), {
          type: fetchPublicKeyAgain.toString(),
          action: fetchPublicKeyAgain,
        });

        const credentials = await tryToLogin(service, address, publicKey);

        if (credentials) {
          store.dispatch(setAuthData({ credentials }));
        }

        store.dispatch(setTopUpTransaction());
        store.dispatch(setAmount(new BigNumber(0)));

        return {
          address,
          credentials,
        };
      },
    },
    meta: {
      onRequest: walletConnectionGuard,
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
