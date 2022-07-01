import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { AddEndpointForm } from './components/AddEndpointForm';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getScheme } from './AddEndpointUtils';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { fetchEndpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { getChainById } from '../ChainItem/components/Endpoint/EndpointUtils';

export const AddEndpoint = () => {
  const dispatchRequest = useDispatchRequest();
  const { chainId } = ChainsRoutesConfig.addEndpoint.useParams();

  useOnMount(() => {
    dispatchRequest(fetchChainNodes(chainId));
    dispatchRequest(fetchPrivateChains());
    dispatchRequest(fetchEndpoints());
    dispatchRequest(fetchPublicChains());
  });

  return (
    <>
      <Queries<
        ResponseData<typeof fetchChainNodes>,
        ResponseData<typeof fetchPrivateChains>,
        ResponseData<typeof fetchEndpoints>,
        ResponseData<typeof fetchPublicChains>
      >
        requestActions={[
          fetchChainNodes,
          fetchPrivateChains,
          fetchEndpoints,
          fetchPublicChains,
        ]}
        isPreloadDisabled
      >
        {(
          { data },
          { data: privateChains },
          { data: endpoints },
          { data: publicChains },
        ) => {
          const privateChain = getChainById(privateChains, chainId);
          const publicChain = getChainById(publicChains, chainId);

          const scheme = getScheme(data);

          const userEndpoints = endpoints?.[chainId];

          return (
            <AddEndpointForm
              chainId={chainId}
              scheme={scheme}
              privateChain={privateChain}
              publicChain={publicChain}
              userEndpoints={userEndpoints}
            />
          );
        }}
      </Queries>
    </>
  );
};
