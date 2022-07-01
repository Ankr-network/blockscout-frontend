import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IWithdrawalStatusResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { retry } from 'modules/api/utils/retry';

export const checkAllowanceTransaction = createSmartAction<
  RequestAction<IWithdrawalStatusResponse, IWithdrawalStatusResponse>
>(
  'topUp/checkAllowanceTransaction',
  (transactionHash: string, onSuccess?: () => void) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: () => {
        return {
          promise: (async (): Promise<any> => {
            const { service } = MultiService.getInstance();

            const transactionReceipt = await service.getTransactionReceipt(
              transactionHash,
            );

            if (transactionReceipt && onSuccess) {
              await onSuccess();
            }

            return retry(
              async () => {
                try {
                  const receipt = await service.getTransactionReceipt(
                    transactionHash,
                  );

                  if (receipt && onSuccess) {
                    await onSuccess();
                  }
                } catch (error) {
                  // ignore error if transaction wasn't found
                  // eslint-disable-next-line no-console
                  console.log('error', error);
                }
              },
              () => false,
            );
          })(),
        };
      },
    },
  }),
);
