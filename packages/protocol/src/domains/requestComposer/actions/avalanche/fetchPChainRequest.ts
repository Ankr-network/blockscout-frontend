import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Avalanche } from 'avalanche';

import { PChainMethodResponse } from 'domains/requestComposer/types/avalanche';
import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/avalanche/p-chain/RPCCallsConfig';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { MethodsRequest } from 'domains/requestComposer/types';
import { t } from 'modules/i18n/utils/intl';

export type FetchCChainRequestResult = {
  response?: [PChainMethodResponse];
  error?: unknown;
  time: number;
};

const MAX_BYTES_SIZE = 10_000_000;

export const fetchPChainRequest = createSmartAction<
  RequestAction<MethodsRequest<PChainMethod>, FetchCChainRequestResult>
>(
  'requestComposer/fetchPChainRequest',
  (
    libraryID: AvalancheLibraryID,
    params: MethodsRequest<PChainMethod>,
    web3URL: string,
  ) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      hideNotificationOnError: true,
      onRequest: (_, __, store) => {
        return {
          promise: (async (): Promise<FetchCChainRequestResult> => {
            const { methodName, params: args } = params;

            store.dispatch(setEVMMethod(methodName as any));

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
