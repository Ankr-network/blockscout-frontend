import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Avalanche } from 'avalanche';

import { CChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/c-chain/RPCCallsConfig';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { MethodsRequest } from 'domains/requestComposer/types';

export type FetchCChainRequestResult = {
  response?: [CChainMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchCChainRequest = createSmartAction<
  RequestAction<MethodsRequest<CChainMethod>, FetchCChainRequestResult>
>(
  'requestComposer/fetchCChainRequest',
  (
    libraryID: AvalancheLibraryID,
    params: MethodsRequest<CChainMethod>,
    web3URL: string,
  ) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchCChainRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName as any));

            const web3Method = RPC_CALLS_CONFIG[methodName] || {};
            const { exec } = web3Method[libraryID] || {};

            const provider = new Avalanche().CChain();

            provider.setBaseURL(web3URL);

            const start = performance.now();

            try {
              const data: CChainMethodResponse = await exec(provider, ...args);
              const response: [CChainMethodResponse] = [data];

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
