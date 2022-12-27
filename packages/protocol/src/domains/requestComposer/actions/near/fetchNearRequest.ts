import { connect } from 'near-api-js';

import { MethodsRequest } from 'domains/requestComposer/types';
import {
  NearLibraryID,
  NearMethod,
  getNearConnectionConfig,
} from 'domains/requestComposer/constants/near';
import { NearMethodResponse } from 'domains/requestComposer/types/near';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/near/RPCCallsConfig';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchNearRequestParams {
  libraryID: NearLibraryID;
  params: MethodsRequest<NearMethod>;
  web3URL: string;
}

export type FetchNearRequestResult = {
  response?: [NearMethodResponse];
  error?: unknown;
  time: number;
};

export const {
  endpoints: { requestComposerFetchNearRequest },
  useLazyRequestComposerFetchNearRequestQuery,
  useRequestComposerFetchNearRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchNearRequest: build.query<
      FetchNearRequestResult,
      FetchNearRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};
        const { exec, parseArgs } = web3Method[libraryID] || {};

        const nearConnection = await connect(getNearConnectionConfig(web3URL));

        const { provider } = nearConnection.connection;

        const start = performance.now();

        try {
          const parsedArgs = args.map((arg, i) =>
            parseArgs?.[i] ? parseArgs[i](arg) : arg,
          );

          const data: NearMethodResponse = await exec(provider, ...parsedArgs);
          const response: [NearMethodResponse] = [data];

          return {
            data: { response, time: performance.now() - start },
          };
        } catch (error) {
          return {
            data: { error, time: performance.now() - start },
          };
        }
      },
    }),
  }),
});
