import { Box } from '@material-ui/core';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { EthAddressType } from 'multirpc-sdk';
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

  const { credentials, hasOauthLogin, hasWeb3Connection, ethAddressType } =
    useAuth();

  const isPremium = Boolean(credentials);

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      isPremium &&
      ethAddressType === EthAddressType.User,
  );

  return (
    <Box className={classes.endpointsList}>
      <RPCEndpoints
        publicChain={publicChain}
        chainType={chainType}
        group={group}
        isPremium={isPremium}
        hasConnectWalletMessage={hasConnectWalletMessage}
      />
      <WSEndpoints
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
      />
    </Box>
  );
};
