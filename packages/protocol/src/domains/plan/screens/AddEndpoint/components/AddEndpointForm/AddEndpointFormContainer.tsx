import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchRequest } from '@redux-requests/react';

import { formatDataForRequest } from './AddEndpointFormUtils';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { AddEndpointForm } from './AddEndpointForm';
import { apiAddPrivateEndpoint } from 'domains/nodeProviders/actions/addPrivateEndpoint';
import { useEndpointBreadcrumbs } from '../../AddEndpointUtils';

export interface AddEndpointFormProps {
  chainId: string;
  scheme: string;
  privateChain: any;
}

export const AddEndpointFormContainer = ({
  chainId,
  scheme,
  privateChain,
}: AddEndpointFormProps) => {
  const history = useHistory();
  const dispatchRequest = useDispatchRequest();

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

  return <AddEndpointForm onSubmit={onSubmit} chainId={chainId} />;
};
