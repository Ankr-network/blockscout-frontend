import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { getAddIsArchiveCB } from '../utils/addIsArchive';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchPublicChains } from './fetchPublicChains';

export interface IFetchPublicChainsInfoResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const fetchPublicChainsInfo = createSmartAction<
  RequestAction<null, IFetchPublicChainsInfoResult>
>('chains/fetchPublicChainsInfo', () => ({
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
        promise: (async (): Promise<IFetchPublicChainsInfoResult> => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            store.dispatchRequest(fetchPublicChains()),
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
