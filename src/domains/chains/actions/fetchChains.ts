import { RequestAction } from '@redux-requests/core';
import { IBlockchainEntity } from '@ankr.com/multirpc';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../../modules/api/MultiService';

interface IFetchChainsResponseData {
  chains: Record<
    string,
    {
      blockchain: IBlockchainEntity;
      rpcUrl: string;
      wsUrl: string;
    }
  >;
}

export interface IApiChain {
  id: string;
  name: string;
  rpcUrl: string;
  wsUrl: string;
  requests?: number;
}

export const fetchChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IApiChain[]>
>('chains/fetchChains', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const chains = await service.createPublicUrls();
      return {
        chains,
      } as IFetchChainsResponseData;
    })(),
  },
  meta: {
    cache: true,
    asMutation: false,
    getData: data => {
      const { chains } = data;

      const chainsArray = Object.values(chains);

      return chainsArray.map(item => {
        const { blockchain, rpcUrl, wsUrl } = item;
        const { id, stats, name } = blockchain;

        const requests = stats?.reqs;

        return {
          id,
          name,
          rpcUrl,
          wsUrl,
          requests,
        };
      });
    },
  },
}));
