import { EndpointInfo } from './EndpointInfo';
import { EndpointQuerySkeleton } from './EndpointQuerySkeleton';
import {
  Endpoints,
  useLazyInfrastructureFetchEndpointsQuery,
} from 'domains/infrastructure/actions/fetchEndpoints';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import {
  PremiumFeatures,
  useLazyChainsFetchPremiumChainFeaturesQuery,
} from 'domains/chains/actions/fetchPremiumChainFeatures';
import { Queries } from 'modules/common/components/Queries/Queries';
import { getChainById } from './EndpointUtils';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';

export const EndpointQuery = ({ chainId }: { chainId: string }) => {
  const { providerData } = useProvider();
  const [fetchPremiumChainFeatures, premiumChainFeaturesState] =
    useLazyChainsFetchPremiumChainFeaturesQuery();
  const [fetchEndpoints, endpointsState] =
    useLazyInfrastructureFetchEndpointsQuery();

  useOnMount(() => {
    fetchPremiumChainFeatures(chainId);
    fetchEndpoints();
  });

  return (
    <Queries<PremiumFeatures, Endpoints>
      queryStates={[premiumChainFeaturesState, endpointsState]}
      spinner={<EndpointQuerySkeleton />}
    >
      {(
        { data: { publicChains = [], privateChains = [] } = {} },
        { data: endpoints = {} },
      ) => {
        const privateChain = getChainById(privateChains, chainId);
        const publicChain = getChainById(publicChains, chainId);

        if (!privateChain) {
          return <PageNotFound />;
        }

        return (
          <EndpointInfo
            privateChain={privateChain}
            publicChain={publicChain}
            endpoints={endpoints}
            providerData={providerData!}
            chainId={chainId}
          />
        );
      }}
    </Queries>
  );
};
