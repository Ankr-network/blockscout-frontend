import { replace } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { IApiChain } from '../../api/queryChains';
import { ChainsRoutesConfig } from '../../routes';
import { chainsFetchChainNodesDetail } from '../fetchChainNodesDetail';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { isChainArchived } from 'domains/chains/screens/ChainItem/utils/isChainArchived';
import { ChainID } from 'modules/chains/types';

export interface IChainItemDetails {
  chain: IApiChain;
  unfilteredChain: IApiChain;
  isChainArchived: boolean;
}

interface FetchPrivateChainParams {
  chainId: ChainID;
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPrivateChain },
  useLazyChainsFetchPrivateChainQuery,
  useChainsFetchPrivateChainQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChain: build.query<
      IChainItemDetails,
      FetchPrivateChainParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, userEndpointToken }, { dispatch }) => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            dispatch(chainsFetchPrivateChains.initiate(userEndpointToken)),
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
        },
      ),
    }),
  }),
});
