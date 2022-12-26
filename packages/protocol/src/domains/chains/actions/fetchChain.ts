import { IJwtToken, INodeEntity } from 'multirpc-sdk';
import { replace } from 'connected-react-router';

import { ChainsRoutesConfig } from '../routes/routesConfig';
import { IApiChain } from '../api/queryChains';
import { chainsFetchChainNodes } from './fetchChainNodes';
import { chainsFetchPrivateChains } from './fetchPrivateChains';
import { chainsFetchPublicChains } from './fetchPublicChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { t } from 'modules/i18n/utils/intl';
import { web3Api } from 'store/queries';

export interface ChainItemParams {
  chainId: string;
  credentials?: IJwtToken;
}

export interface IChainItemDetails {
  chain: IApiChain;
  unfilteredChain: IApiChain;
  nodes?: INodeEntity[];
}

export const {
  endpoints: { chainsFetchChain },
  useLazyChainsFetchChainQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchChain: build.query<IChainItemDetails, ChainItemParams>({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, credentials }, { dispatch }) => {
          const [
            { data: { chains = [], allChains = [] } = {} },
            { data: nodes },
          ] = await Promise.all([
            credentials
              ? dispatch(chainsFetchPrivateChains.initiate())
              : dispatch(chainsFetchPublicChains.initiate()),
            dispatch(chainsFetchChainNodes.initiate(chainId)),
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
              nodes,
            },
          };
        },
      ),
    }),
  }),
});
