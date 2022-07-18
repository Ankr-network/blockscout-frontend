import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../../modules/api/MultiService';

interface IFetchEncryptionKey {
  key: string;
}

export const fetchEncryptionKey = createSmartAction<
  RequestAction<IFetchEncryptionKey, IFetchEncryptionKey>
>('auth/fetchEncryptionKey', () => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();
      const key = await service.requestUserEncryptionKey();

      return { key } as IFetchEncryptionKey;
    })(),
  },
  meta: {
    asQuery: true,
  },
}));
