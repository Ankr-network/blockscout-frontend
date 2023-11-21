import { useCallback, useMemo } from 'react';

import { Chain } from 'modules/chains/types';
import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';
import { useLazyInfrastructureApiAddPrivateEndpointQuery } from 'domains/infrastructure/actions/addPrivateEndpoint';
import { useRedirect } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useRedirect';

import {
  formatDataForRequest,
  usePrivateUrls,
  usePublicUrls,
} from './AddEndpointFormUtils';
import { useEndpointBreadcrumbs } from '../../AddEndpointUtils';
import { AddEndpointForm } from './AddEndpointForm';

export interface AddEndpointFormProps {
  chainId: string;
  scheme: string;
  privateChain?: Chain;
  publicChain?: Chain;
  userEndpoints?: UserEndpoint[];
}

export const AddEndpointFormContainer = ({
  chainId,
  scheme,
  privateChain,
  publicChain,
  userEndpoints,
}: AddEndpointFormProps) => {
  const [apiAddPrivateEndpoint] =
    useLazyInfrastructureApiAddPrivateEndpointQuery();
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

      await apiAddPrivateEndpoint(privateEndpoint).then(() => {
        redirect();
      });
    },
    [apiAddPrivateEndpoint, redirect, chainId, scheme],
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
