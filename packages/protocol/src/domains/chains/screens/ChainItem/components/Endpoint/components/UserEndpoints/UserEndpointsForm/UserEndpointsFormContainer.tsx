import React, { useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { formatDataForRequest } from './UserEndpointsFormUtils';
import { UserEndpointsForm } from './UserEndpointsForm';
import { apiEditPrivateEndpoint } from 'domains/infrastructure/actions/apiEditPrivateEndpoint';
import { IUserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';

interface UserEndpointsFormContainerProps {
  endpoints: IUserEndpoint[];
  chainId: string;
  privateUrls: string[];
  publicUrls: string[];
}

export const UserEndpointsFormContainer = ({
  endpoints,
  chainId,
  privateUrls,
  publicUrls,
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
      privateUrls={privateUrls}
      publicUrls={publicUrls}
    />
  );
};
