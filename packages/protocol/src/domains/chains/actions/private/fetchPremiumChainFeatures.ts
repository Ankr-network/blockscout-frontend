import { RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { Chain } from 'modules/chains/types';
import { selectBlockchains } from 'modules/chains/store/selectors';

import { chainsFetchPublicChains } from '../public/fetchPublicChains';

export interface PremiumFeatures {
  privateChainDetails?: Chain;
  privateChains: Chain[];
  publicChains: Chain[];
}

interface FetchPremiumChainFeaturesParams {
  chainId: string;
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPremiumChainFeatures },
  useLazyChainsFetchPremiumChainFeaturesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPremiumChainFeatures: build.query<
      PremiumFeatures,
      FetchPremiumChainFeaturesParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ chainId, userEndpointToken }, { getState }) => {
          const publicService = MultiService.getService();

          let { data: { chains: publicChains = [] } = {} } =
            chainsFetchPublicChains.select()(getState() as RootState);

          const { data: blockchains = [] } = selectBlockchains(
            getState() as RootState,
          );

          if (!publicChains) {
            const formattedPublicChains =
              publicService.formatPublicEndpoints(blockchains);

            publicChains = formatChainsConfigToChains(
              formattedPublicChains,
            ).filter(({ premiumOnly }) => !premiumOnly);
          }

          const formattedPrivateChains = publicService.formatPrivateEndpoints(
            blockchains,
            userEndpointToken,
          );

          const privateChains = formatChainsConfigToChains(
            formattedPrivateChains,
          );

          const privateChainDetails = privateChains.find(
            item => item.id === chainId,
          );

          return {
            data: {
              publicChains,
              privateChains,
              privateChainDetails,
            },
          };
        },
      ),
    }),
  }),
  overrideExisting: true,
});
