import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MethodsRequest } from 'domains/requestComposer/types';
import {
  TronChainMethodResponse,
  TronChainMethod,
} from 'domains/requestComposer/constants/tron';
import { safeStringifyJSON } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/RequestComposer/TronRequestComposer/TronLibraryContent/LibraryContentUtils';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';

export type FetchTronChainRequestResult = {
  response?: [TronChainMethodResponse];
  error?: unknown;
  time: number;
};

const objectError = (error: any) => {
  if (typeof error === 'string') {
    return { error };
  }

  return error;
};

const getMethod = (url: string) => {
  const lastIndex = url.lastIndexOf('/') + 1;
  return url.substring(lastIndex);
};

export const fetchTronChainRequest = createSmartAction<
  RequestAction<MethodsRequest<TronChainMethod>, FetchTronChainRequestResult>
>('requestComposer/fetchTronChainRequest', (url, method, params) => {
  const start = performance.now();

  return {
    request: {
      url,
      method,
      data: params,
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      onRequest: (request, __, store) => {
        store.dispatch(setEVMMethod(getMethod(url) as any));
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

        return { response, time };
      },
    },
  };
});
