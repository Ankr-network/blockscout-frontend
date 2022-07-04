import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWithdrawalStatusResponse } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { retry } from 'modules/api/utils/retry';
import { t } from 'modules/i18n/utils/intl';

const MAX_ATTEMPTS = 10000;

export const checkAllowanceTransaction = createSmartAction<
  RequestAction<IWithdrawalStatusResponse, IWithdrawalStatusResponse>
>('topUp/checkAllowanceTransaction', (transactionHash: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    hideNotificationOnError: false,
    onRequest: () => {
      return {
        promise: (async (): Promise<any> => {
          const { service } = MultiService.getInstance();

          const transactionReceipt = await service.getTransactionReceipt(
            transactionHash,
          );

          if (transactionReceipt) {
            return undefined;
          }

          return retry(
            async () => {
              const receipt = await (async () => {
                try {
                  return await service.getTransactionReceipt(transactionHash);
                } catch (error) {
                  throw new Error(t('error.failed'));
                }
              })();

              if (!receipt) throw new Error();
            },
            () => false,
            MAX_ATTEMPTS,
          );
        })(),
      };
    },
  },
}));
