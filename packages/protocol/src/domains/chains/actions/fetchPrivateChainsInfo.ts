import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { getAddIsArchiveCB } from '../utils/addIsArchive';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchPrivateChains } from './fetchPrivateChains';

export interface IFetchPrivateChainsInfoResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const fetchPrivateChainsInfo = createSmartAction<
  RequestAction<null, IFetchPrivateChainsInfoResult>
>('chains/fetchPrivateChainsInfo', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IFetchPrivateChainsInfoResult> => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            store.dispatchRequest(fetchPrivateChains()),
            store.dispatchRequest(fetchChainNodes()),
          ]);

          const addIsArchive = getAddIsArchiveCB(nodes);

          return {
            chains: chains.map(addIsArchive),
            allChains: allChains.map(addIsArchive),
          };
        })(),
      };
    },
  },
}));
