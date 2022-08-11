import React, { useCallback, useMemo } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import {
  formatDataForRequest,
  usePrivateUrls,
  usePublicUrls,
} from './AddEndpointFormUtils';
import { AddEndpointForm } from './AddEndpointForm';
import { apiAddPrivateEndpoint } from 'domains/infrastructure/actions/addPrivateEndpoint';
import { useEndpointBreadcrumbs } from '../../AddEndpointUtils';
import { IApiChain } from 'domains/chains/api/queryChains';
import { IUserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { useRedirect } from 'domains/chains/screens/ChainItem/components/ChainItemTabs/hooks/useRedirect';

export interface AddEndpointFormProps {
  chainId: string;
  scheme: string;
  privateChain?: IApiChain;
  publicChain?: IApiChain;
  userEndpoints?: IUserEndpoint[];
}

export const AddEndpointFormContainer = ({
  chainId,
  scheme,
  privateChain,
  publicChain,
  userEndpoints,
}: AddEndpointFormProps) => {
  const dispatchRequest = useDispatchRequest();

  const privateUrls = usePrivateUrls(privateChain);
  const publicUrls = usePublicUrls(publicChain);

  const endpoints = useMemo(
    () => userEndpoints?.map(item => item.requestUrl) || [],
    [userEndpoints],
  );

  useEndpointBreadcrumbs(privateChain?.name, privateChain?.id);

  const redirect = useRedirect(chainId);

  const onSubmit = useCallback(
    async (httpAddress: string) => {
      const privateEndpoint = formatDataForRequest(
        chainId,
        scheme,
        httpAddress,
      );

      await dispatchRequest(apiAddPrivateEndpoint(privateEndpoint)).then(() => {
        redirect();
      });
    },
    [dispatchRequest, redirect, chainId, scheme],
  );

  return (
    <AddEndpointForm
      onSubmit={onSubmit}
      chainId={chainId}
      privateUrls={privateUrls}
      publicUrls={publicUrls}
      endpoints={endpoints}
    />
  );
};
