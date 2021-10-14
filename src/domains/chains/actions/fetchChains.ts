import { RequestAction } from '@redux-requests/core';
import { IBlockchainEntity } from '@ankr.com/multirpc/dist/types/worker';
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

export const fetchChains = createSmartAction<
  RequestAction<IFetchChainsResponseData, IFetchChainsResponseData>
>('chains/fetchChains', () => ({
  request: {
    promise: (async () => {
      const service = MultiService.getInstance();

      const chains = await service.createPublicUrls();
      return {
        chains,
      } as IFetchChainsResponseData;
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => data,
  },
}));
