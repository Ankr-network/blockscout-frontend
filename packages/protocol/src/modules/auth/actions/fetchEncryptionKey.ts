import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';

interface IFetchEncryptionKey {
  key: string;
}

export const fetchEncryptionKey = createSmartAction<
  RequestAction<IFetchEncryptionKey, IFetchEncryptionKey>
>('auth/fetchEncryptionKey', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();
      const key = await service.requestUserEncryptionKey();

      return { key } as IFetchEncryptionKey;
    })(),
  },
  meta: {
    asQuery: true,
  },
}));
