import { fetchPremiumChainFeatures } from 'domains/chains/actions/fetchPremiumChainFeatures';
import { fetchEndpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { Queries } from 'modules/common/components/Queries/Queries';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import React from 'react';
import { EndpointInfo } from './EndpointInfo';
import { EndpointQuerySkeleton } from './EndpointQuerySkeleton';
import { getChainById } from './EndpointUtils';

export const EndpointQuery = ({ chainId }: { chainId: string }) => {
  const { providerData } = useProvider();

  return (
    <Queries<
      ResponseData<typeof fetchPremiumChainFeatures>,
      ResponseData<typeof fetchEndpoints>
    >
      requestActions={[fetchPremiumChainFeatures, fetchEndpoints]}
      spinner={<EndpointQuerySkeleton />}
    >
      {({ data: { publicChains, privateChains } }, { data: endpoints }) => {
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
            providerData={providerData}
            chainId={chainId}
          />
        );
      }}
    </Queries>
  );
};
