import { GetState, RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { chainsFetchPublicChains } from './fetchPublicChains';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from '../../auth/utils/credentialsGuard';
import { filterMapChains, IApiChain } from '../api/queryChains';
import { web3Api } from 'store/queries';

export interface PremiumFeatures {
  privateChainDetails: IApiChain | undefined;
  privateChains: IApiChain[];
  publicChains: IApiChain[];
}

export const {
  endpoints: { chainsFetchPremiumChainFeatures },
  useLazyChainsFetchPremiumChainFeaturesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchPremiumChainFeatures: build.query<PremiumFeatures, string>({
      queryFn: createNotifyingQueryFn(async (chainId, { getState }) => {
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

        const { workerTokenData } = credentialsGuard(getState as GetState);

        const formattedPrivateChains = publicService.formatPrivateEndpoints(
          blockchains,
          workerTokenData?.userEndpointToken,
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
      }),
    }),
  }),
});
