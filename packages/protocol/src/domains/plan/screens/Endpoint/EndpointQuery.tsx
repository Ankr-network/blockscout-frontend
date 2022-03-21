import React, { useEffect } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { PlanRoutesConfig } from 'domains/plan/Routes';
import { getChainById } from './EndpointUtils';
import { fetchEndpoints } from 'domains/nodeProviders/actions/fetchEndpoints';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { PageNotFound } from 'modules/router/components/PageNotFound';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { EndpointInfo } from './EndpointInfo';
import { EndpointSkeleton } from './components/EndpointSkeleton';

export const EndpointQuery = () => {
  const { chainId } = PlanRoutesConfig.endpoint.useParams();
  const { providerData } = useProvider();

  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchEndpoints());
    dispatchRequest(fetchPrivateChains());
  }, [dispatchRequest]);

  return (
    <Queries<
      ResponseData<typeof fetchEndpoints>,
      ResponseData<typeof fetchPrivateChains>
    >
      requestActions={[fetchEndpoints, fetchPrivateChains]}
      spinner={<EndpointSkeleton />}
    >
      {({ data: endpoints }, { data: privateChains }) => {
        const privateChain = getChainById(privateChains, chainId);

        if (!privateChain) {
          return <PageNotFound />;
        }

        return (
          <EndpointInfo
            privateChain={privateChain}
            endpoints={endpoints}
            providerData={providerData}
            chainId={chainId}
          />
        );
      }}
    </Queries>
  );
};
