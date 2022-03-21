import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { PlanRoutesConfig } from 'domains/plan/Routes';
import { AddEndpointForm } from './components/AddEndpointForm';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchChainNodes } from 'domains/chains/actions/fetchChainNodes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { getScheme } from './AddEndpointUtils';
import { fetchPrivateChains } from 'domains/chains/actions/fetchPrivateChains';
import { getChainById } from '../Endpoint/EndpointUtils';

export const AddEndpoint = () => {
  const dispatchRequest = useDispatchRequest();
  const { chainId } = PlanRoutesConfig.addEndpoint.useParams();

  useOnMount(() => {
    dispatchRequest(fetchChainNodes(chainId));
    dispatchRequest(fetchPrivateChains());
  });

  return (
    <>
      <Queries<
        ResponseData<typeof fetchChainNodes>,
        ResponseData<typeof fetchPrivateChains>
      >
        requestActions={[fetchChainNodes, fetchPrivateChains]}
        isPreloadDisabled
      >
        {({ data }, { data: privateChains }) => {
          const privateChain = getChainById(privateChains, chainId);

          const scheme = getScheme(data);

          return (
            <AddEndpointForm
              chainId={chainId}
              scheme={scheme}
              privateChain={privateChain}
            />
          );
        }}
      </Queries>
    </>
  );
};
