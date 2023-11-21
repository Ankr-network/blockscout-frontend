import { replace } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { isChainArchived } from 'domains/chains/screens/ChainItem/utils/isChainArchived';
import { Chain } from 'modules/chains/types';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';

import { ChainsRoutesConfig } from '../../routes';
import { chainsFetchPublicChains } from './fetchPublicChains';

export interface IPublicChainItemDetails {
  chain: Chain;
  unfilteredChain: Chain;
  isChainArchived: boolean;
}

export const {
  endpoints: { chainsFetchPublicChain },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChain: build.query<IPublicChainItemDetails, string>({
      queryFn: createNotifyingQueryFn(async (chainId, { dispatch }) => {
        const [
          { data: { chains = [], allChains = [] } = {} },
          { data: nodes },
        ] = await Promise.all([
          dispatch(chainsFetchPublicChains.initiate()),
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
  overrideExisting: true,
});
