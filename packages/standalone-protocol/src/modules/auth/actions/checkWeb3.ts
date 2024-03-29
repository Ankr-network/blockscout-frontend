import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { t } from 'modules/i18n/utils/intl';

import { withStore } from './withStore';
import { hasMetamask } from '../utils/hasMetamask';

export const checkWeb3 = createSmartAction<RequestAction<void, void>>(
  'auth/injectWeb3Modal',
  () => ({
    request: {
      promise: async () => {
        if (!hasMetamask()) {
          throw new Error(t('error.no-metamask'));
        }
      },
    },
    meta: {
      onRequest: withStore,
    },
  }),
);
