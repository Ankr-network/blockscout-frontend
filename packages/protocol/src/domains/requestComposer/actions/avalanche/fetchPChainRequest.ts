import { Avalanche } from 'avalanche';

import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { PChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/p-chain/RPCCallsConfig';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';

export interface FetchPChainRequestParams {
  libraryID: AvalancheLibraryID;
  params: MethodsRequest<PChainMethod>;
  web3URL: string;
}

export interface FetchPChainRequestResult {
  error?: unknown;
  response?: [PChainMethodResponse];
  time: number;
}

const MAX_BYTES_SIZE = 10_000_000;

export const {
  endpoints: { requestComposerFetchPChainRequest },
  useLazyRequestComposerFetchPChainRequestQuery,
  useRequestComposerFetchPChainRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchPChainRequest: build.query<
      FetchPChainRequestResult,
      FetchPChainRequestParams
    >({
      queryFn: async ({ libraryID, params, web3URL }, { dispatch }) => {
        const { methodName, params: args } = params;

        dispatch(setEVMMethod(methodName as string));

        const web3Method = RPC_CALLS_CONFIG[methodName] || {};
        const { exec } = web3Method[libraryID] || {};

        const provider = new Avalanche().PChain();

        provider.setBaseURL(web3URL);

        const start = performance.now();

        try {
          const data: PChainMethodResponse = await exec(provider, ...args);

          const responseSize = JSON.stringify(data).length;

          if (responseSize > MAX_BYTES_SIZE) {
            return {
              error: new Error(
                t('request-composer.logger.errors.large-response'),
              ),
              time: performance.now() - start,
            };
          }

          const response: [PChainMethodResponse] = [data];

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
