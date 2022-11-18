import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MethodsRequest } from 'domains/requestComposer/types';
import { HarmonyMethod } from 'domains/requestComposer/constants/harmony';
import { setHarmonyMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { objectError } from '../tron/fetchTronChainRequest';
import { safeStringifyJSON } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/RequestComposer/TronRequestComposer/TronLibraryContent/LibraryContentUtils';
import { t } from '@ankr.com/common';

export type FetchHarmonyChainRequestResult = {
  response?: [HarmonyMethod];
  error?: unknown;
  time: number;
};
const MAX_BYTES_SIZE = 4_000_000;

export const fetchHarmonyChainReqeust = createSmartAction<
  RequestAction<MethodsRequest<HarmonyMethod>, FetchHarmonyChainRequestResult>
>('reqeustComposer/fetchHarmonyChainReqeust', (url, harmonyMethod, params) => {
  const start = performance.now();

  return {
    request: {
      url,
      method: 'POST',
      data: {
        method: harmonyMethod,
        jsonrpc: '2.0',
        params,
        id: 1,
      },
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      onRequest: (request, _, store) => {
        store.dispatch(setHarmonyMethod(harmonyMethod) as any);
        return request;
      },
      getData: (data: any) => {
        const time = performance.now() - start;

        if (data?.error) {
          return { error: objectError(data.error?.message), time };
        }
        if (data?.Error) {
          return { error: objectError(data.Error), time };
        }

        let response = [];

        if (typeof data === 'object' && !('error' in data)) {
          try {
            response = [safeStringifyJSON(data)];
          } catch (e) {
            response = [];
          }
        } else {
          response = data;
        }

        const responseSize = JSON.stringify(data).length;

        if (responseSize > MAX_BYTES_SIZE) {
          return {
            error: new Error(
              t(
                'chain-item.request-composer.method-description.harmony.large-response-error',
              ),
            ),
            time: performance.now() - start,
          };
        }

        return { response, time };
      },
    },
  };
});
