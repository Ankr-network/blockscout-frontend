import React, { useMemo } from 'react';
import { IProvider } from 'multirpc-sdk';

import { useStyles } from './EndpointStyles';
import { PrivateEndpoints } from './components/PrivateEndpoints';
import { ChainMainInfo } from './components/ChainMainInfo';
import { UserEndpoints } from './components/UserEndpoints';
import {
  canAddEndpoint,
  hasLimit,
  getLimit,
} from 'domains/plan/screens/Dashboard/DashboardUtils';
import { IEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { useEndpointBreadcrumbs } from './EndpointUtils';

interface EndpointInfoProps {
  providerData: IProvider | null;
  chainId: string;
  endpoints: IEndpoint;
  privateChain: IApiChain;
  publicChain: IApiChain;
}

export const EndpointInfo = ({
  providerData,
  chainId,
  endpoints,
  privateChain,
  publicChain,
}: EndpointInfoProps) => {
  const classes = useStyles();

  useEndpointBreadcrumbs(privateChain.name);

  const isMoreThanLimit = hasLimit(providerData, endpoints);
  const limit = getLimit(providerData);

  const hasChain = canAddEndpoint(providerData, chainId);
  const userEndpoints = endpoints?.[chainId];

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

  return (
    <>
      <ChainMainInfo name={privateChain.name} logoSrc={privateChain.icon} />
      <div className={classes.section}>
        <PrivateEndpoints chain={privateChain} />
      </div>
      <div className={classes.section}>
        <UserEndpoints
          data={userEndpoints}
          hasChain={hasChain}
          isMoreThanLimit={isMoreThanLimit}
          limit={limit}
          privateUrls={privateUrls}
          publicUrls={publicUrls}
        />
      </div>
    </>
  );
};
