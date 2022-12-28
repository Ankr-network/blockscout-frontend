import axios, { Method } from 'axios';

import { FetchTronChainRequestResult } from './types';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getMethod } from './utils/getMethod';
import { getTronChainRequest } from './utils/getTronChainRequest';
import { setEVMMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchTronChainRequestParams {
  web3URL: string;
  method: Method;
  params: any;
}

export const {
  endpoints: { requestComposerFetchTronChainRequest },
  useLazyRequestComposerFetchTronChainRequestQuery,
  useRequestComposerFetchTronChainRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchTronChainRequest: build.query<
      FetchTronChainRequestResult,
      FetchTronChainRequestParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ method, params, web3URL: url }, { dispatch }) => {
          dispatch(setEVMMethod(getMethod(url)));

          const api = axios.create();

          const start = performance.now();

          const { data } = await api.request<unknown>({
            method,
            data: params,
            url,
          });

          return { data: getTronChainRequest(data, start) };
        },
      ),
    }),
  }),
});
