import { Box } from '@material-ui/core';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { RPCEndpoints } from '../RPCEndpoints';
import { WSEndpoints } from '../WSEndpoints';
import { useEndpointsStyles } from './EndpointsStyles';

export interface EndpointsProps {
  publicChain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
}

export const Endpoints = ({
  publicChain,
  chainType,
  group,
}: EndpointsProps) => {
  const classes = useEndpointsStyles();

  return (
    <Box className={classes.endpointsList}>
      <RPCEndpoints
        publicChain={publicChain}
        chainType={chainType}
        group={group}
      />
      <WSEndpoints group={group} />
    </Box>
  );
};
