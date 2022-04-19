import React from 'react';

import { getChainById } from './EndpointUtils';
import { fetchEndpoints } from 'domains/nodeProviders/actions/fetchEndpoints';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { PageNotFound } from 'modules/router/components/PageNotFound';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { EndpointInfo } from './EndpointInfo';

export const EndpointQuery = ({ chainId }: { chainId: string }) => {
  const { providerData } = useProvider();

  return (
    <Queries<
      ResponseData<typeof fetchEndpoints>,
      ResponseData<typeof fetchPrivateChains>,
      ResponseData<typeof fetchPublicChains>
    >
      requestActions={[fetchEndpoints, fetchPrivateChains, fetchPublicChains]}
    >
      {(
        { data: endpoints },
        { data: privateChains },
        { data: publicChains },
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
            providerData={providerData}
            chainId={chainId}
          />
        );
      }}
    </Queries>
  );
};
