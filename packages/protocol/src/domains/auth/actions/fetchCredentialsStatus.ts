import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../../modules/api/MultiService';

interface ICredentialsStatus {
  remainingBlocks?: number;
  isReady: boolean;
}

export const fetchCredentialsStatus = createSmartAction<
  RequestAction<ICredentialsStatus, ICredentialsStatus>,
  [string]
>('auth/fetchCredentialsStatus', (transactionHash: string) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.isJwtTokenIssueAvailable(transactionHash);
    })(),
  },
  meta: {
    asQuery: true,
  },
}));
