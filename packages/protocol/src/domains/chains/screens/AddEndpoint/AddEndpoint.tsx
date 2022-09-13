import { useDispatchRequest } from '@redux-requests/react';

import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { fetchEndpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getChainById } from '../ChainItem/components/Endpoint/EndpointUtils';
import { getScheme } from './AddEndpointUtils';
import { AddEndpointForm } from './components/AddEndpointForm';

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
          { data: { chains: privateChains = [] } = {} },
          { data: endpoints },
          { data: { chains: publicChains = [] } = {} },
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
