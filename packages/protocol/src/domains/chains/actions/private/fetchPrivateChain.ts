import { replace } from 'connected-react-router';
import { t } from '@ankr.com/common';

import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { isChainArchived } from 'domains/chains/screens/ChainItem/utils/isChainArchived';
import { ChainID, ChainType } from 'modules/chains/types';
import { ChainGroupID } from 'modules/endpoints/types';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';

import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { ChainsRoutesConfig } from '../../routes';
import { IPublicChainItemDetails } from '../public/fetchPublicChain';

export interface IPrivateChainItemDetails extends IPublicChainItemDetails {
  selectedType?: ChainType;
  selectedGroupId?: ChainGroupID;
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
      IPrivateChainItemDetails,
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
            dispatch(
              replace(
                ChainsRoutesConfig.chains.generatePath({
                  isLoggedIn: true,
                }),
              ),
            );

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
