import { useCallback } from 'react';

import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { UserEndpointsForm } from './UserEndpointsForm';
import { formatDataForRequest } from './UserEndpointsFormUtils';
import { useLazyInfrastructureApiEditPrivateEndpointQuery } from 'domains/infrastructure/actions/apiEditPrivateEndpoint';

export interface UserEndpointsFormContainerProps {
  chainId: string;
  endpoints: UserEndpoint[];
  privateUrls: string[];
  publicUrls: string[];
}

export const UserEndpointsFormContainer = ({
  chainId,
  endpoints,
  privateUrls,
  publicUrls,
}: UserEndpointsFormContainerProps) => {
  const [apiEditPrivateEndpoint] =
    useLazyInfrastructureApiEditPrivateEndpointQuery();

  const onSubmit = useCallback(
    (data?: UserEndpoint) => {
      if (!data) return;

      const updatedEndpoint = formatDataForRequest(data);

      apiEditPrivateEndpoint(updatedEndpoint);
    },
    [apiEditPrivateEndpoint],
  );

  return (
    <UserEndpointsForm
      endpoints={endpoints}
      chainId={chainId}
      onSubmit={onSubmit}
      privateUrls={privateUrls}
      publicUrls={publicUrls}
    />
  );
};
