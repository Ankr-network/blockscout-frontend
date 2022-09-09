import { DispatchRequest, RequestAction } from '@redux-requests/core';
import { replace } from 'connected-react-router';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { IJwtToken, INodeEntity } from 'multirpc-sdk';
import { Store } from 'store';
import { IApiChain } from '../api/queryChains';
import { ChainsRoutesConfig } from '../routes/routesConfig';
import { fetchChainNodes } from './fetchChainNodes';
import { fetchPrivateChains } from './fetchPrivateChains';
import { fetchPublicChains } from './fetchPublicChains';

export interface IChainItemDetails {
  chain: IApiChain;
  publicChain: IApiChain;
  nodes?: INodeEntity[];
}

export const fetchChain = createSmartAction<
  RequestAction<null, IChainItemDetails>,
  [string, IJwtToken?]
>('chains/fetchChain', (chainId: string, credentials?: IJwtToken) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: (
      request: any,
      action: RequestAction,
      store: Store & { dispatchRequest: DispatchRequest },
    ) => {
      return {
        promise: (async (): Promise<IChainItemDetails> => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            credentials
              ? store.dispatchRequest(fetchPrivateChains())
              : store.dispatchRequest(fetchPublicChains()),
            store.dispatchRequest(fetchChainNodes(chainId)),
          ]);

          const chain = chains.find(item => item.id === chainId);
          const publicChain = allChains.find(item => item.id === chainId);

          if (!chain || !publicChain) {
            store.dispatch(replace(ChainsRoutesConfig.chains.generatePath()));
            throw new Error('ChainId not found');
          }

          return {
            chain,
            publicChain,
            nodes,
          };
        })(),
      };
    },
  },
}));
