import { IApiChain, filterMapChains } from '../../api/queryChains';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export interface FetchPrivateChainsResult {
  allChains: IApiChain[];
  chains: IApiChain[];
}

export const {
  useLazyChainsFetchPrivateChainsQuery,
  endpoints: { chainsFetchPrivateChains },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPrivateChains: build.query<
      FetchPrivateChainsResult,
      string | undefined
    >({
      queryFn: createNotifyingQueryFn(async (userEndpointToken?: string) => {
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
            chains: filterMapChains(formattedPrivateChains),
            allChains: filterMapChains(formattedPublicChains),
          },
        };
      }),
    }),
  }),
});
