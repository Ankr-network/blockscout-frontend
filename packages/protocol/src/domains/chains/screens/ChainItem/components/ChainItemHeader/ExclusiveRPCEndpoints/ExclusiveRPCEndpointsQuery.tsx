import React from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { fetchPrivateChainDetails } from 'domains/chains/actions/fetchPrivateChainDetails';

import { ExclusiveRPCEndpoints } from './ExclusiveRPCEndpoints';
import { ExclusiveRPCEndpointsSkeleton } from './ExclusiveRPCEndpointsSkeleton';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useProvider } from 'modules/auth/hooks/useProvider';

export interface ExclusiveRPCEndpointsQueryProps {
  chainId: string;
}

export const ExclusiveRPCEndpointsQuery = ({
  chainId,
}: ExclusiveRPCEndpointsQueryProps) => {
  const { handleFetchProvider, providerData } = useProvider();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(fetchPrivateChainDetails(chainId));
    handleFetchProvider();
  });

  return (
    <Queries<ResponseData<typeof fetchPrivateChainDetails>>
      requestActions={[fetchPrivateChainDetails]}
      spinner={<ExclusiveRPCEndpointsSkeleton />}
    >
      {({ data }) => (
        <ExclusiveRPCEndpoints chain={data} isPremium={!!providerData} />
      )}
    </Queries>
  );
};
