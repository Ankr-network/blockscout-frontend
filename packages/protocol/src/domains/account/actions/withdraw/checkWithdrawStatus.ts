import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWithdrawalStatusResponse, WithdrawStatus } from 'multirpc-sdk';
// eslint-disable-next-line import/no-cycle
import { resetWithdraw } from './resetWithdraw';
import { MultiService } from 'modules/api/MultiService';

export const WIHDRAWAL_STATUS_INTERVAL = 30;

export const checkWithdrawStatus = createSmartAction<
  RequestAction<IWithdrawalStatusResponse, WithdrawStatus | undefined>
>('withdraw/checkWithdrawStatus', (transactionHash: string, poll?: number) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    showNotificationOnError: false,
    poll,
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const { service } = MultiService.getInstance();

          try {
            const data = await service.getWithdrawalStatus(transactionHash);

            const status = data?.withdraw?.status;

            if (poll && status === WithdrawStatus.WITHDRAW_STATUS_COMPLETED) {
              await store.dispatchRequest(resetWithdraw());
            }

            return status;
          } catch (error) {
            // ignore error if transaction wasn't found
            // eslint-disable-next-line no-console
            console.log('error', error);
          }

          return undefined;
        })(),
      };
    },
  },
}));
