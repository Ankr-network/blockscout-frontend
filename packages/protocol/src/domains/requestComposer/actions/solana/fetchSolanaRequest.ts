import { Connection } from '@solana/web3.js';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import { MethodsRequest } from 'domains/requestComposer/types';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { SolanaMethodResponse } from 'domains/requestComposer/types/solana';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';

export type FetchSolanaRequestResult = {
  response?: [SolanaMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchSolanaRequest = createSmartAction<
  RequestAction<MethodsRequest<SolanaMethod>, FetchSolanaRequestResult>
>(
  'requestComposer/fetchSolanaRequest',
  (
    libraryID: SolanaLibraryID,
    params: MethodsRequest<SolanaMethod>,
    web3URL: string,
  ) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchSolanaRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName));

            const web3Method = RPC_CALLS_CONFIG[methodName] || {};

            const { exec } = web3Method[libraryID] || {};

            const provider = new Connection(web3URL);

            const start = performance.now();

            try {
              const data: SolanaMethodResponse = await exec(provider, ...args);
              const response: [SolanaMethodResponse] = [data];

              return { response, time: performance.now() - start };
            } catch (error) {
              return { error, time: performance.now() - start };
            }
          })(),
        };
      },
    },
  }),
);
