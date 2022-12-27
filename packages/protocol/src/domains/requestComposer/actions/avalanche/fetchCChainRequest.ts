import { Avalanche } from 'avalanche';

import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { CChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/c-chain/RPCCallsConfig';
import { MethodsRequest } from 'domains/requestComposer/types';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchCChainRequestParams {
  libraryID: AvalancheLibraryID;
  params: MethodsRequest<CChainMethod>;
  web3URL: string;
}

export type FetchCChainRequestResult = {
  error?: unknown;
  response?: [CChainMethodResponse];
  time: number;
};

export const {
  endpoints: { requestComposerFetchCChainRequest },
  useLazyRequestComposerFetchCChainRequestQuery,
  useRequestComposerFetchCChainRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchCChainRequest: build.query<
      FetchCChainRequestResult,
      FetchCChainRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName as string));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};
        const { exec } = web3Method[libraryID] || {};

        const provider = new Avalanche().CChain();

        provider.setBaseURL(web3URL);

        const start = performance.now();

        try {
          const data: CChainMethodResponse = await exec(provider, ...args);
          const response: [CChainMethodResponse] = [data];

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
