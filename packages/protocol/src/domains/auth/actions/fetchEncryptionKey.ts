import {
  METAMASK_REJECTED_OPERATION_CODE,
  USER_DENIED_MESSAGE_SIGNATURE_CODE,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchEncryptionKeyResult {
  key: string;
}

export const {
  endpoints: { authFetchEncryptionKey },
  useAuthFetchEncryptionKeyQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authFetchEncryptionKey: build.query<FetchEncryptionKeyResult, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getWeb3Service();

        let key = '';

        try {
          const { publicKey } = await service
            .getTokenDecryptionService()
            .requestEncryptionKeys();

          key = publicKey;
        } catch (error: any) {
          const isRejectOperationError =
            error?.code === METAMASK_REJECTED_OPERATION_CODE;
          const isDeniedMessageSignatureError =
            error?.code === USER_DENIED_MESSAGE_SIGNATURE_CODE;

          if (!isRejectOperationError && !isDeniedMessageSignatureError) {
            key = await service
              .getTokenDecryptionService()
              .requestMetamaskEncryptionKey();
          }
        }

        if (!key) {
          throw new Error('Failed to load encryption key');
        }

        return { data: { key } };
      }),
    }),
  }),
});
