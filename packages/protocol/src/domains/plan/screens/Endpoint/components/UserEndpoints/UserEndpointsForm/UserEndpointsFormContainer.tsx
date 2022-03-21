import React, { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { formatDataForRequest } from './UserEndpointsFormUtils';
import { UserEndpointsForm } from './UserEndpointsForm';
import { apiEditPrivateEndpoint } from 'domains/nodeProviders/actions/apiEditPrivateEndpoint';
import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';

interface UserEndpointsFormContainerProps {
  endpoints: IUserEndpoint[];
  chainId: string;
}

export const UserEndpointsFormContainer = ({
  endpoints,
  chainId,
}: UserEndpointsFormContainerProps) => {
  const dispatchRequest = useDispatchRequest();

  const onSubmit = useCallback(
    (data?: IUserEndpoint) => {
      if (!data) return;

      const updatedEndpoint = formatDataForRequest(data);

      dispatchRequest(apiEditPrivateEndpoint(updatedEndpoint));
    },
    [dispatchRequest],
  );

  return (
    <UserEndpointsForm
      endpoints={endpoints}
      chainId={chainId}
      onSubmit={onSubmit}
    />
  );
};
