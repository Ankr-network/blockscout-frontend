import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { canPayByCard } from './canPayByCard';
import { connect } from 'domains/auth/actions/connect';
import { disconnect } from 'domains/auth/actions/disconnect';
import { timeout } from 'modules/common/utils/timeout';

const TOPUP_EVENT_TIMEOUT = 3 * 60_000;

export const checkTheFirstCardPayment = createSmartAction<
  RequestAction<string>
>('usdTopUp/checkTheFirstCardPayment', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    hideNotificationOnError: true,
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<void> => {
          const { data: isEligible } = await store.dispatchRequest(
            canPayByCard(),
          );

          if (!isEligible) return;

          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) return;

          const service = await MultiService.getInstance();
          const { currentAccount: address } = service.getKeyProvider();
          const lastTopUpEvent = await service.getLastLockedFundsEvent(address);

          // User has topped up, but hasn't had credentials. Credentials will be issued after login
          if (lastTopUpEvent) {
            store.dispatch(disconnect());
            return;
          }

          // Check new top up event every 3 minutes
          let inProcess = true;

          while (inProcess) {
            // eslint-disable-next-line
            await timeout(TOPUP_EVENT_TIMEOUT);

            const { data: newConnectData } = getQuery(store.getState(), {
              type: connect.toString(),
              action: connect,
            });

            if (!newConnectData.address) {
              inProcess = false;
              break;
            }

            // eslint-disable-next-line
            const lastTopUpEvent = await service.getLastLockedFundsEvent(
              address,
            );

            inProcess = !lastTopUpEvent;

            if (lastTopUpEvent) {
              store.dispatch(disconnect());
            }
          }
        })(),
      };
    },
  },
}));
