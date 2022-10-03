import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Avalanche } from 'avalanche';

import { XChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/x-chain/RPCCallsConfig';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { MethodsRequest } from 'domains/requestComposer/types';

export type FetchXChainRequestResult = {
  response?: [XChainMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchXChainRequest = createSmartAction<
  RequestAction<MethodsRequest<XChainMethod>, FetchXChainRequestResult>
>(
  'requestComposer/fetchXChainRequest',
  (
    libraryID: AvalancheLibraryID,
    params: MethodsRequest<XChainMethod>,
    web3URL: string,
  ) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchXChainRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName as any));

            const web3Method = RPC_CALLS_CONFIG[methodName] || {};
            const { exec } = web3Method[libraryID] || {};

            const provider = new Avalanche().XChain();

            provider.setBaseURL(web3URL);

            const start = performance.now();

            try {
              const data: XChainMethodResponse = await exec(provider, ...args);
              const response: [XChainMethodResponse] = [data];

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
