import { IProvider } from 'multirpc-sdk';
import { useMemo } from 'react';

import { Endpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { Chain } from 'domains/chains/types';
import { UserEndpoints } from '../UserEndpoints';
import {
  canAddEndpoint,
  getLimit,
  hasLimit,
  getUrls,
  getChainName,
} from './EndpointUtils';
import { useStyles } from './EndpointStyles';

export interface EndpointInfoProps {
  chainId: string;
  endpoints: Endpoints;
  privateChain: Chain;
  providerData: IProvider | null;
  publicChain?: Chain;
}

export const EndpointInfo = ({
  chainId,
  endpoints,
  privateChain,
  providerData,
  publicChain,
}: EndpointInfoProps) => {
  const { classes } = useStyles();

  const isMoreThanLimit = hasLimit(providerData, endpoints);
  const limit = getLimit(providerData);
  const hasChain = canAddEndpoint(providerData, chainId);

  const userEndpoints = endpoints?.[chainId];
  const chainName = useMemo(
    () => getChainName({ chainId, privateChain, publicChain }),
    [chainId, privateChain, publicChain],
  );

  const privateUrls = useMemo(() => getUrls(privateChain), [privateChain]);
  const publicUrls = useMemo(() => getUrls(publicChain), [publicChain]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <UserEndpoints
          chainName={chainName}
          data={userEndpoints}
          hasChain={hasChain}
          isMoreThanLimit={isMoreThanLimit}
          limit={limit}
          privateUrls={privateUrls}
          publicUrls={publicUrls}
        />
      </div>
    </div>
  );
};
