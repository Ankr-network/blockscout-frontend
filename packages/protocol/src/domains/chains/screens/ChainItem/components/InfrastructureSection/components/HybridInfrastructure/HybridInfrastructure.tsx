import { EndpointInfo } from './components/EndpointInfo';
import { HybridInfrastructureSkeleton } from './components/HybridInfrastructureSkeleton';
import {
  Endpoints,
  useLazyInfrastructureFetchEndpointsQuery,
} from 'domains/infrastructure/actions/fetchEndpoints';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import {
  PremiumFeatures,
  useLazyChainsFetchPremiumChainFeaturesQuery,
} from 'domains/chains/actions/private/fetchPremiumChainFeatures';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { getChainById } from 'domains/chains/screens/ChainItem/utils/getChainById';

interface HybridInfrastructureProps {
  chainId: string;
}

export const HybridInfrastructure = ({
  chainId,
}: HybridInfrastructureProps) => {
  const { providerData } = useProvider();
  const [fetchPremiumChainFeatures, premiumChainFeaturesState] =
    useLazyChainsFetchPremiumChainFeaturesQuery();
  const [fetchEndpoints, endpointsState] =
    useLazyInfrastructureFetchEndpointsQuery();
  const userEndpointToken = useUserEndpointToken();

  useOnMount(() => {
    fetchPremiumChainFeatures({ chainId, userEndpointToken });
    fetchEndpoints();
  });

  return (
    <Queries<PremiumFeatures, Endpoints>
      queryStates={[premiumChainFeaturesState, endpointsState]}
      spinner={<HybridInfrastructureSkeleton />}
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
