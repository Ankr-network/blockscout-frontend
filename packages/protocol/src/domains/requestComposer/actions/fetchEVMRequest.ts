import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { LibraryID } from '../constants';
import { RPC_CALLS_CONFIG } from '../utils/RPCCallsConfig';
import { EVMMethodResponse, EVMMethodsRequest } from '../types';
import { buildProvider } from '../utils/buildProvider';
import { setEVMMethod } from '../store/requestComposerSlice';

export type FetchEVMRequestResult = {
  response?: [EVMMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchEVMRequest = createSmartAction<
  RequestAction<EVMMethodsRequest, FetchEVMRequestResult>
>(
  'requestComposer/fetchEVMRequest',
  (libraryID: LibraryID, params: EVMMethodsRequest, web3URL: string) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchEVMRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName));

            const web3Method = RPC_CALLS_CONFIG[methodName] || {};
            const { exec } = web3Method[libraryID] || {};

            const provider = buildProvider(libraryID, web3URL);

            const start = performance.now();

            try {
              const data: EVMMethodResponse = await exec(provider, ...args);

              // We need to use a reference data type for response to make sure
              // that react will render the components with the same value
              // for different requests.
              const response: [EVMMethodResponse] = [data];

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
