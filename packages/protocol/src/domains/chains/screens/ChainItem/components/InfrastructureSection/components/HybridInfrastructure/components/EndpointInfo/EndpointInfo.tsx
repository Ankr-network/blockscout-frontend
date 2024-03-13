import { useMemo } from 'react';

import { Endpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { Chain } from 'modules/chains/types';

import { UserEndpoints } from '../UserEndpoints';
import { getUrls } from './EndpointUtils';
import { useStyles } from './EndpointStyles';

export interface EndpointInfoProps {
  chainId: string;
  endpoints: Endpoints;
  privateChain: Chain;
  publicChain?: Chain;
}

export const EndpointInfo = ({
  chainId,
  endpoints,
  privateChain,
  publicChain,
}: EndpointInfoProps) => {
  const { classes } = useStyles();

  const userEndpoints = endpoints?.[chainId];

  const privateUrls = useMemo(() => getUrls(privateChain), [privateChain]);
  const publicUrls = useMemo(() => getUrls(publicChain), [publicChain]);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <UserEndpoints
          data={userEndpoints}
          privateUrls={privateUrls}
          publicUrls={publicUrls}
        />
      </div>
    </div>
  );
};
