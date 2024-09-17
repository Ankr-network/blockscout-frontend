import { Chain } from '@ankr.com/chains-list';

import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import {
  selectConfiguredBlockchainsForToken,
  selectPublicBlockchains,
} from 'modules/chains/store/selectors';

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
          const publicChains = selectPublicBlockchains(
            getState() as RootState,
          ).filter(({ premiumOnly }) => !premiumOnly);

          const privateChains = selectConfiguredBlockchainsForToken(
            getState() as RootState,
            userEndpointToken,
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
