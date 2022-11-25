import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { withStore } from 'domains/auth/utils/withStore';
import { disconnect } from 'domains/auth/actions/disconnect';

const deleteAllCookies = () => {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
};

export const signout = createSmartAction<RequestAction>(
  'oauth/signout',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        store.dispatch(disconnect());

        deleteAllCookies();
      },
    },
    meta: {
      onRequest: withStore,
    },
  }),
);
