import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchRequest } from '@redux-requests/react';

import { formatDataForRequest } from './AddEndpointFormUtils';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { AddEndpointForm } from './AddEndpointForm';
import { apiAddPrivateEndpoint } from 'domains/nodeProviders/actions/addPrivateEndpoint';
import { useEndpointBreadcrumbs } from '../../AddEndpointUtils';
import { IApiChain } from 'domains/chains/api/queryChains';
import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';

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
  const history = useHistory();
  const dispatchRequest = useDispatchRequest();

  const privateUrls = useMemo(
    () => [...(privateChain?.rpcUrls || []), ...(privateChain?.wsUrls || [])],
    [privateChain],
  );

  const publicUrls = useMemo(
    () => [...(publicChain?.rpcUrls || []), ...(publicChain?.wsUrls || [])],
    [publicChain],
  );

  const endpoints = useMemo(
    () => userEndpoints?.map(item => item.requestUrl) || [],
    [userEndpoints],
  );

  useEndpointBreadcrumbs(privateChain?.name, privateChain?.id);

  const redirect = useCallback(() => {
    history.push(PlanRoutesConfig.endpoint.generatePath(chainId));
  }, [history, chainId]);

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
