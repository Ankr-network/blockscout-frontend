import { Avalanche } from 'avalanche';

import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import {
  FetchRequestParams,
  FetchRequestResult,
} from 'domains/requestComposer/types';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/x-chain/RPCCallsConfig';
import { XChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export type FetchXChainRequestParams = FetchRequestParams<
  AvalancheLibraryID,
  XChainMethod
>;

export type FetchXChainRequestResult = FetchRequestResult<XChainMethodResponse>;

export const {
  endpoints: { requestComposerFetchXChainRequest },
  useLazyRequestComposerFetchXChainRequestQuery,
  useRequestComposerFetchXChainRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchXChainRequest: build.query<
      FetchXChainRequestResult,
      FetchXChainRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName as string));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};
        const { exec } = web3Method[libraryID] || {};

        const provider = new Avalanche().XChain();

        provider.setBaseURL(web3URL);

        const start = performance.now();

        try {
          const data: XChainMethodResponse = await exec(provider, ...args);
          const response: [XChainMethodResponse] = [data];

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
