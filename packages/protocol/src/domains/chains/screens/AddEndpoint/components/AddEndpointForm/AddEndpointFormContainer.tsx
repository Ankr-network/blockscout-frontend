import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchRequest } from '@redux-requests/react';

import { formatDataForRequest } from './AddEndpointFormUtils';
import { AddEndpointForm } from './AddEndpointForm';
import { apiAddPrivateEndpoint } from 'domains/nodeProviders/actions/addPrivateEndpoint';
import { useEndpointBreadcrumbs } from '../../AddEndpointUtils';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';
import { ChainsRoutesConfig } from 'domains/chains/Routes';

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
    () =>
      [
        ...(privateChain?.urls || []),
        ...(privateChain?.extensions || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
        ...(privateChain?.extenders || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [privateChain],
  );

  const publicUrls = useMemo(
    () =>
      [
        ...(publicChain?.urls || []),
        ...(publicChain?.extensions || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
        ...(publicChain?.extenders || []).flatMap<IApiChainURL>(
          ({ urls }) => urls,
        ),
      ].flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc])),
    [publicChain],
  );

  const endpoints = useMemo(
    () => userEndpoints?.map(item => item.requestUrl) || [],
    [userEndpoints],
  );

  useEndpointBreadcrumbs(privateChain?.name, privateChain?.id);

  const redirect = useCallback(() => {
    history.push(ChainsRoutesConfig.chainDetails.generatePath(chainId));
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
