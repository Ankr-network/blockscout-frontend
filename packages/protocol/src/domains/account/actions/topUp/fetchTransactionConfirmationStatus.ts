import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

interface ICredentialsStatus {
  remainingBlocks?: number;
  isReady: boolean;
}

export const fetchTransactionConfirmationStatus = createSmartAction<
  RequestAction<ICredentialsStatus, ICredentialsStatus>,
  [string]
>('topUp/fetchTransactionConfirmationStatus', (transactionHash: string) => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();

      return service.canIssueJwtToken(transactionHash);
    })(),
  },
  meta: {
    asQuery: true,
  },
}));
