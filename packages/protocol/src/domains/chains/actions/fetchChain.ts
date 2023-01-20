import { replace } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { IApiChain } from '../api/queryChains';
import { INodesDetailEntity } from 'multirpc-sdk';
import { ChainsRoutesConfig } from '../routes/routesConfig';
import { chainsFetchChainNodesDetail } from './fetchChainNodesDetail';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { chainsFetchPublicChains } from './fetchPublicChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface ChainItemParams {
  chainId: string;
  hasPrivateAccess: boolean;
}

export interface IChainItemDetails {
  chain: IApiChain;
  unfilteredChain: IApiChain;
  nodes?: INodesDetailEntity[];
}

export const {
  endpoints: { chainsFetchChain },
  useLazyChainsFetchChainQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChain: build.query<IChainItemDetails, ChainItemParams>({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, hasPrivateAccess }, { dispatch }) => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            hasPrivateAccess
              ? dispatch(chainsFetchPrivateChains.initiate())
              : dispatch(chainsFetchPublicChains.initiate()),
            dispatch(chainsFetchChainNodesDetail.initiate()),
          ]);

          const chain = chains.find(item => item.id === chainId);
          const unfilteredChain = allChains.find(item => item.id === chainId);

          if (!chain || !unfilteredChain) {
            dispatch(replace(ChainsRoutesConfig.chains.generatePath()));

            throw new Error(t('chain-item.not-found'));
          }

          return {
            data: {
              chain,
              unfilteredChain,
              nodes: nodes?.filter(item => item.id === chainId),
            },
          };
        },
      ),
    }),
  }),
});
