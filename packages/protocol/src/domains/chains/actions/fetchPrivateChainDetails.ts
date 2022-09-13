import { getQuery, RequestAction } from '@redux-requests/core';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { replace } from 'connected-react-router';
import { IApiChain } from '../api/queryChains';
import { ChainsRoutesConfig } from '../routes/routesConfig';

export const fetchPrivateChainDetails = createSmartAction<
  RequestAction<null, IApiChain>
>('chains/fetchPrivateChainDetails', (chainId: string) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    onRequest: (_request, _action, store) => {
      return {
        promise: (async (): Promise<IApiChain> => {
          const {
            data: { chains: privateChains = [] },
          } = getQuery(store.getState(), {
            type: fetchPrivateChains.toString(),
            action: fetchPrivateChains,
            defaultData: {},
          });

          const privateChainDetails = privateChains.find(
            item => item.id === chainId,
          );

          if (!privateChainDetails) {
            store.dispatch(replace(ChainsRoutesConfig.chains.generatePath()));
            throw new Error('ChainId not found');
          }

          return privateChainDetails;
        })(),
      };
    },
  },
}));
