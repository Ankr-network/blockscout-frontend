import { Box } from '@material-ui/core';

import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpoints } from '../RPCEndpoints';
import { WSEndpoints } from '../WSEndpoints';
import { useEndpointsStyles } from './EndpointsStyles';

export interface EndpointsProps {
  chain: IApiChain;
  group: EndpointGroup;
}

export const Endpoints = ({ chain, group }: EndpointsProps) => {
  const classes = useEndpointsStyles();

  return (
    <Box className={classes.endpointsList}>
      <RPCEndpoints chain={chain} group={group} />
      <WSEndpoints group={group} />
    </Box>
  );
};
