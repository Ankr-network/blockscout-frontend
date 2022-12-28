import { GetState } from 'store';
import { IApiChain, filterMapChains } from '../api/queryChains';
import { MultiService } from '../../../modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from '../../auth/utils/credentialsGuard';
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
    chainsFetchPrivateChains: build.query<FetchPrivateChainsResult, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState }) => {
        const publicService = MultiService.getService();
        const { workerTokenData } = credentialsGuard(getState as GetState);

        const chains = await publicService.getPublicGateway().getBlockchains();

        const formattedPrivateChains = workerTokenData?.userEndpointToken
          ? publicService.formatPrivateEndpoints(
              chains,
              workerTokenData?.userEndpointToken,
            )
          : publicService.formatPublicEndpoints(chains);

        const formattedPublicChains =
          publicService.formatPublicEndpoints(chains);

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
