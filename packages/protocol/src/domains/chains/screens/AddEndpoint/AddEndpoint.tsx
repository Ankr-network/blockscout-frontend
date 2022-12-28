import { INodeEntity } from 'multirpc-sdk';

import { AddEndpointForm } from './components/AddEndpointForm';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  Endpoints,
  useLazyInfrastructureFetchEndpointsQuery,
} from 'domains/infrastructure/actions/fetchEndpoints';
import {
  FetchPrivateChainsResult,
  useLazyChainsFetchPrivateChainsQuery,
} from 'domains/chains/actions/fetchPrivateChains';
import {
  FetchPublicChainsResult,
  useLazyChainsFetchPublicChainsQuery,
} from 'domains/chains/actions/fetchPublicChains';
import { Queries } from 'modules/common/components/Queries/Queries';
import { getChainById } from '../ChainItem/components/Endpoint/EndpointUtils';
import { getScheme } from './AddEndpointUtils';
import { useLazyChainsFetchChainNodesQuery } from 'domains/chains/actions/fetchChainNodes';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const AddEndpoint = () => {
  const { chainId } = ChainsRoutesConfig.addEndpoint.useParams();

  const [fetchChainNodes, chainNodesState] =
    useLazyChainsFetchChainNodesQuery();
  const [fetchPrivateChains, privateChainsState] =
    useLazyChainsFetchPrivateChainsQuery();
  const [fetchEndpoints, endpointsState] =
    useLazyInfrastructureFetchEndpointsQuery();
  const [fetchPublicChains, publicChainsState] =
    useLazyChainsFetchPublicChainsQuery();

  useOnMount(() => {
    fetchChainNodes(chainId);
    fetchPrivateChains();
    fetchEndpoints();
    fetchPublicChains();
  });

  return (
    <Queries<
      INodeEntity[],
      FetchPrivateChainsResult,
      Endpoints,
      FetchPublicChainsResult
    >
      isPreloadDisabled
      queryStates={[
        chainNodesState,
        privateChainsState,
        endpointsState,
        publicChainsState,
      ]}
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
  );
};
