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
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';
import { getChainById } from 'domains/chains/screens/ChainPage/utils/getChainById';

import { HybridInfrastructureSkeleton } from './components/HybridInfrastructureSkeleton';
import { EndpointInfo } from './components/EndpointInfo';

interface HybridInfrastructureProps {
  chainId: string;
}

export const HybridInfrastructure = ({
  chainId,
}: HybridInfrastructureProps) => {
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
        { data: { privateChains = [], publicChains = [] } = {} },
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
            chainId={chainId}
          />
        );
      }}
    </Queries>
  );
};
