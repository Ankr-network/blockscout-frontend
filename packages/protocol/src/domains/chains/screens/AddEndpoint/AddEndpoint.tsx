import { INodesDetailEntity } from 'multirpc-sdk';

import { AddEndpointForm } from './components/AddEndpointForm';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import {
  Endpoints,
  useLazyInfrastructureFetchEndpointsQuery,
} from 'domains/infrastructure/actions/fetchEndpoints';
import {
  FetchPrivateChainsResult,
  useLazyChainsFetchPrivateChainsQuery,
} from 'domains/chains/actions/private/fetchPrivateChains';
import {
  FetchPublicChainsResult,
  useLazyChainsFetchPublicChainsQuery,
} from 'domains/chains/actions/public/fetchPublicChains';
import { Queries } from 'modules/common/components/Queries/Queries';
import { getChainById } from '../ChainItem/components/Endpoint/EndpointUtils';
import { getScheme } from './AddEndpointUtils';
import { useLazyChainsFetchChainNodesDetailQuery } from 'domains/chains/actions/fetchChainNodesDetail';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainID } from 'modules/chains/types';

export const AddEndpoint = () => {
  const { chainId } = ChainsRoutesConfig.addEndpoint.useParams();

  const [fetchChainNodesDetail, chainNodesDetailState] =
    useLazyChainsFetchChainNodesDetailQuery();
  const [fetchPrivateChains, privateChainsState] =
    useLazyChainsFetchPrivateChainsQuery();
  const [fetchEndpoints, endpointsState] =
    useLazyInfrastructureFetchEndpointsQuery();
  const [fetchPublicChains, publicChainsState] =
    useLazyChainsFetchPublicChainsQuery();

  useOnMount(() => {
    fetchChainNodesDetail(chainId as ChainID);
    fetchPrivateChains();
    fetchEndpoints();
    fetchPublicChains();
  });

  return (
    <Queries<
      INodesDetailEntity[],
      FetchPrivateChainsResult,
      Endpoints,
      FetchPublicChainsResult
    >
      isPreloadDisabled
      queryStates={[
        chainNodesDetailState,
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
