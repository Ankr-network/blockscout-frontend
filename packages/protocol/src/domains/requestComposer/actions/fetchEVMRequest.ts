import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { EVMLibraryID, EVMMethod } from '../constants';
import { setEVMMethod } from '../store/requestComposerSlice';
import { EVMMethodResponse, MethodsRequest } from '../types';
import { buildProvider } from '../utils/buildProvider';
import { RPC_CALLS_CONFIG } from '../utils/RPCCallsConfig';

export type FetchEVMRequestResult = {
  response?: [EVMMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchEVMRequest = createSmartAction<
  RequestAction<MethodsRequest<EVMMethod>, FetchEVMRequestResult>
>(
  'requestComposer/fetchEVMRequest',
  (
    libraryID: EVMLibraryID,
    params: MethodsRequest<EVMMethod>,
    web3URL: string,
  ) => ({
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
            const { exec, parseArgs } = web3Method[libraryID] || {};

            const provider = buildProvider(libraryID, web3URL);

            const start = performance.now();

            try {
              const parsedArgs = args.map((arg, i) =>
                parseArgs?.[i] ? parseArgs[i](arg) : arg,
              );

              const data: EVMMethodResponse = await exec(
                provider,
                ...parsedArgs,
              );

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
