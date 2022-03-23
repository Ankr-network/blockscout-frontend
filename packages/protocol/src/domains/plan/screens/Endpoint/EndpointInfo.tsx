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
import { IApiChain } from 'domains/chains/api/queryChains';
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
    () => [...(privateChain?.rpcUrls || []), ...(privateChain?.wsUrls || [])],
    [privateChain],
  );

  const publicUrls = useMemo(
    () => [...(publicChain?.rpcUrls || []), ...(publicChain?.wsUrls || [])],
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
