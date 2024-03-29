import {
  METAMASK_REJECTED_OPERATION_CODE,
  USER_DENIED_MESSAGE_SIGNATURE_CODE,
} from 'multirpc-sdk';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export interface FetchEncryptionKeyResult {
  key: string;
}

const failedLoadKeyError = new Error('Failed to load encryption key');

export const {
  endpoints: { authFetchEncryptionKey },
  useAuthFetchEncryptionKeyQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authFetchEncryptionKey: build.query<FetchEncryptionKeyResult, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ web3Service }) => {
          let key = '';

          try {
            const { publicKey } = await web3Service
              .getTokenDecryptionService()
              .requestEncryptionKeys();

            key = publicKey;
          } catch (error: any) {
            const isRejectOperationError =
              error?.code === METAMASK_REJECTED_OPERATION_CODE;
            const isDeniedMessageSignatureError =
              error?.code === USER_DENIED_MESSAGE_SIGNATURE_CODE;

            if (!isRejectOperationError && !isDeniedMessageSignatureError) {
              key = await web3Service
                .getTokenDecryptionService()
                .requestMetamaskEncryptionKey();
            }
          }

          if (!key) {
            throw failedLoadKeyError;
          }

          return { data: { key } };
        }),
        fallback: { error: failedLoadKeyError },
      }),
    }),
  }),
});
