import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { Chain } from 'modules/chains/types';
import { selectBlockchains } from 'modules/chains/store/selectors';
import { RootState } from 'store';

export interface FetchPublicChainsResult {
  chains: Chain[];
  allChains: Chain[];
}

export const {
  useChainsFetchPublicChainsQuery,
  useLazyChainsFetchPublicChainsQuery,
  endpoints: { chainsFetchPublicChains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChains: build.query<FetchPublicChainsResult, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        const service = MultiService.getService();

        const { data: chains = [] } = selectBlockchains(
          getState() as RootState,
        );

        const formattedPublicChains = service.formatPublicEndpoints(chains);

        return {
          data: {
            chains: formatChainsConfigToChains(formattedPublicChains),
            allChains: formatChainsConfigToChains(formattedPublicChains),
          },
        };
      }),
    }),
  }),
});
