import { Connection } from '@solana/web3.js';

import { MethodsRequest } from 'domains/requestComposer/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { SolanaMethodResponse } from 'domains/requestComposer/types/solana';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchSolanaRequestParams {
  libraryID: SolanaLibraryID;
  params: MethodsRequest<SolanaMethod>;
  web3URL: string;
}

export interface FetchSolanaRequestResult {
  response?: [SolanaMethodResponse];
  error?: unknown;
  time: number;
}

export const {
  endpoints: { requestComposerFetchSolanaRequest },
  useLazyRequestComposerFetchSolanaRequestQuery,
  useRequestComposerFetchSolanaRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchSolanaRequest: build.query<
      FetchSolanaRequestResult,
      FetchSolanaRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};

        const { exec } = web3Method[libraryID] || {};

        const provider = new Connection(web3URL);

        const start = performance.now();

        try {
          const data: SolanaMethodResponse = await exec(provider, ...args);
          const response: [SolanaMethodResponse] = [data];

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
