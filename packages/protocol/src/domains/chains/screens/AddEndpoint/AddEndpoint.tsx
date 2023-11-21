import { INodesDetailEntity } from 'multirpc-sdk';

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
import { useLazyChainsFetchChainNodesDetailQuery } from 'modules/chains/actions/fetchChainNodesDetail';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { ChainID } from 'modules/chains/types';
import { useUserEndpointToken } from 'domains/chains/hooks/useUserEndpointToken';

import { getScheme } from './AddEndpointUtils';
import { AddEndpointForm } from './components/AddEndpointForm';
import { getChainById } from '../ChainItem/utils/getChainById';

export const AddEndpoint = () => {
  const { chainId } = ChainsRoutesConfig.addEndpoint.useParams();
  const userEndpointToken = useUserEndpointToken();

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
    fetchPrivateChains(userEndpointToken);
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
      {
        /* eslint-disable  max-params */
        (
          { data },
          { data: { chains: privateChains = [] } = {} },
          { data: endpoints },
          { data: { chains: publicChains = [] } = {} },
        ) => {
          /* eslint-enable  max-params */

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
        }
      }
    </Queries>
  );
};
