import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { METAMASK_REJECTED_OPERATION_CODE } from 'multirpc-sdk';

interface IFetchEncryptionKey {
  key: string;
}

export const fetchEncryptionKey = createSmartAction<
  RequestAction<IFetchEncryptionKey, IFetchEncryptionKey>
>('auth/fetchEncryptionKey', () => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getWeb3Service();

      let key = '';

      try {
        const { publicKey } = await service
          .getTokenDecryptionService()
          .requestEncryptionKeys();

        key = publicKey;
      } catch (error: any) {
        if (error?.code !== METAMASK_REJECTED_OPERATION_CODE) {
          key = await service
            .getTokenDecryptionService()
            .requestMetamaskEncryptionKey();
        }
      }

      if (!key) {
        throw new Error('Failed to load encryption key');
      }

      return { key } as IFetchEncryptionKey;
    })(),
  },
  meta: {
    asQuery: true,
  },
}));
