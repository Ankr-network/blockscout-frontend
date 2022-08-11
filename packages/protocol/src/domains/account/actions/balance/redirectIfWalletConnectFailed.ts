import { RequestAction, RequestsStore } from '@redux-requests/core';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { push } from 'connected-react-router';
import { PATH_ACCOUNT } from 'domains/account/Routes';
import { historyInstance } from 'modules/common/utils/historyInstance';

export const redirectIfWalletConnectFailed = createSmartAction<RequestAction>(
  'account/redirectIfWalletConnectFailed',
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
            const link = PricingRoutesConfig.pricing.generagePath();

            if (historyInstance.location.pathname.includes(PATH_ACCOUNT)) {
              store.dispatch(push(link));

              return true;
            }

            return false;
          })(),
        };
      },

      asMutation: false,
    },
  }),
);
