import { IApiChain, filterMapChains } from '../api/queryChains';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchPublicChainsResult {
  chains: IApiChain[];
  allChains: IApiChain[];
}

export const {
  useLazyChainsFetchPublicChainsQuery,
  endpoints: { chainsFetchPublicChains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPublicChains: build.query<FetchPublicChainsResult, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();
        const chains = await service.getPublicGateway().getBlockchains();

        const formattedPublicChains = service.formatPublicEndpoints(chains);

        return {
          data: {
            chains: filterMapChains(formattedPublicChains),
            allChains: filterMapChains(formattedPublicChains),
          },
        };
      }),
    }),
  }),
});
