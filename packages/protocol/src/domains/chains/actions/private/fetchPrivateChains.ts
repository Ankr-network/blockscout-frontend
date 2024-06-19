import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { Chain } from 'modules/chains/types';

export interface FetchPrivateChainsResult {
  allChains: Chain[];
  chains: Chain[];
}

export const {
  endpoints: { chainsFetchPrivateChains },
  useLazyChainsFetchPrivateChainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChains: build.query<
      FetchPrivateChainsResult,
      string | undefined
    >({
      queryFn: createNotifyingQueryFn(async userEndpointToken => {
        const publicService = MultiService.getService();

        const chains = await publicService.getPublicGateway().getBlockchains();

        const formattedPrivateChains = userEndpointToken
          ? publicService.formatPrivateEndpoints([...chains], userEndpointToken)
          : publicService.formatPublicEndpoints([...chains]);

        const formattedPublicChains = publicService.formatPublicEndpoints([
          ...chains,
        ]);

        return {
          data: {
            chains: formatChainsConfigToChains(formattedPrivateChains),
            allChains: formatChainsConfigToChains(formattedPublicChains),
          },
        };
      }),
    }),
  }),
});
