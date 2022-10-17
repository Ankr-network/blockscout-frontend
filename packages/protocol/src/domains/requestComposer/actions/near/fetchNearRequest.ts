import { RequestAction } from '@redux-requests/core';
import { connect } from 'near-api-js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import {
  getNearConnectionConfig,
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { MethodsRequest } from 'domains/requestComposer/types';
import { NearMethodResponse } from 'domains/requestComposer/types/near';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/near/RPCCallsConfig';

export type FetchNearRequestResult = {
  response?: [NearMethodResponse];
  error?: unknown;
  time: number;
};

export const fetchNearRequest = createSmartAction<
  RequestAction<MethodsRequest<NearMethod>, FetchNearRequestResult>
>(
  'requestComposer/fetchNearRequest',
  (
    libraryID: NearLibraryID,
    params: MethodsRequest<NearMethod>,
    web3URL: string,
  ) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchNearRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName as any));

            const web3Method = RPC_CALLS_CONFIG[methodName] || {};
            const { exec, parseArgs } = web3Method[libraryID] || {};

            const nearConnection = await connect(
              getNearConnectionConfig(web3URL),
            );

            const { provider } = nearConnection.connection;

            const start = performance.now();

            try {
              const parsedArgs = args.map((arg, i) =>
                parseArgs?.[i] ? parseArgs[i](arg) : arg,
              );

              const data: NearMethodResponse = await exec(
                provider,
                ...parsedArgs,
              );
              const response: [NearMethodResponse] = [data];

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
