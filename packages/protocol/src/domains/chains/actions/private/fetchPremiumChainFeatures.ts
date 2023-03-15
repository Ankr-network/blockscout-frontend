import { RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { chainsFetchPublicChains } from '../public/fetchPublicChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { filterMapChains, IApiChain } from '../../api/queryChains';
import { web3Api } from 'store/queries';

export interface PremiumFeatures {
  privateChainDetails: IApiChain | undefined;
  privateChains: IApiChain[];
  publicChains: IApiChain[];
}

interface FetchPremiumChainFeaturesParams {
  chainId: string;
  userEndpointToken?: string;
}

export const {
  endpoints: { chainsFetchPremiumChainFeatures },
  useLazyChainsFetchPremiumChainFeaturesQuery,
  useChainsFetchPremiumChainFeaturesQuery,
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

          const blockchains = await publicService
            .getPublicGateway()
            .getBlockchains();

          if (!publicChains) {
            const formattedPublicChains =
              await publicService.formatPublicEndpoints(blockchains);

            publicChains = filterMapChains(
              formattedPublicChains,
              ({ blockchain }) => !blockchain.premiumOnly,
            );
          }

          const formattedPrivateChains = publicService.formatPrivateEndpoints(
            blockchains,
            userEndpointToken,
          );

          const privateChains = filterMapChains(formattedPrivateChains);

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
});
