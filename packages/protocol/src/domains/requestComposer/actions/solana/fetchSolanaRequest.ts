import { Connection } from '@solana/web3.js';

import {
  FetchRequestParams,
  FetchRequestResult,
} from 'domains/requestComposer/types';
import { getRPCCallsConfig } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { SolanaMethodResponse } from 'domains/requestComposer/types/solana';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export type FetchSolanaRequestParams = FetchRequestParams<
  SolanaLibraryID,
  SolanaMethod
>;

export type FetchSolanaRequestResult = FetchRequestResult<SolanaMethodResponse>;

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

        const web3Method = getRPCCallsConfig()[methodName] || {};

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
