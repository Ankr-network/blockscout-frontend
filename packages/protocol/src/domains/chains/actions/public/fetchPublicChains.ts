import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { Chain } from 'modules/chains/types';

export interface FetchPublicChainsResult {
  chains: Chain[];
  allChains: Chain[];
}

export const {
  endpoints: { chainsFetchPublicChains },
  useLazyChainsFetchPublicChainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChains: build.query<FetchPublicChainsResult, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const chains = await service.getPublicGateway().getBlockchains();

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
