import axios from 'axios';

import {
  HarmonyMethod,
  HarmonyMethodResponse,
} from 'domains/requestComposer/constants/harmony';
import { MethodsRequest } from 'domains/requestComposer/types';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getHarmonyChainRequestResult } from './utils/getHarmonyChainRequestResult';
import { setHarmonyMethod } from 'domains/requestComposer/store/requestComposerSlice';
import { web3Api } from 'store/queries';

export interface FetchHarmonyChainRequestParams {
  method: HarmonyMethod;
  params: MethodsRequest<HarmonyMethod>;
  web3URL: string;
}

export interface FetchHarmonyChainRequestResult {
  error?: unknown;
  response?: [HarmonyMethodResponse];
  time: number;
}

const jsonrpc = '2.0';
const id = 1;

export const {
  endpoints: { requestComposerFetchHarmonyChainRequest },
  useLazyRequestComposerFetchHarmonyChainRequestQuery,
  useRequestComposerFetchHarmonyChainRequestQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    requestComposerFetchHarmonyChainRequest: build.query<
      FetchHarmonyChainRequestResult,
      FetchHarmonyChainRequestParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ method, params, web3URL }, { dispatch }) => {
          const start = performance.now();

          dispatch(setHarmonyMethod(method));

          const api = axios.create();

          const { data } = await api.post<unknown>(web3URL, {
            id,
            jsonrpc,
            method,
            params,
          });

          return { data: getHarmonyChainRequestResult(data, start) };
        },
      ),
    }),
  }),
});
