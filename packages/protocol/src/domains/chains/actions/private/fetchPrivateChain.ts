import { replace } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { IApiChain } from '../../api/queryChains';
import { ChainsRoutesConfig } from '../../routes/routesConfig';
import { chainsFetchChainNodesDetail } from '../fetchChainNodesDetail';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { isChainArchived } from 'domains/chains/screens/ChainItem/utils/isChainArchived';

export interface IChainItemDetails {
  chain: IApiChain;
  unfilteredChain: IApiChain;
  isChainArchived: boolean;
}

export const {
  endpoints: { chainsFetchPrivateChain },
  useLazyChainsFetchPrivateChainQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChain: build.query<IChainItemDetails, string>({
      queryFn: createNotifyingQueryFn(async (chainId, { dispatch }) => {
        const [
          { data: { chains = [], allChains = [] } = {} },
          { data: nodes },
        ] = await Promise.all([
          dispatch(chainsFetchPrivateChains.initiate()),
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
            isChainArchived: isChainArchived(nodes, chainId),
          },
        };
      }),
    }),
  }),
});
