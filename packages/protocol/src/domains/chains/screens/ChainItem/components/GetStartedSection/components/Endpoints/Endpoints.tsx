import { Box } from '@material-ui/core';

import { useAuth } from 'domains/auth/hooks/useAuth';
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

  const {
    hasOauthLogin,
    hasWeb3Connection,
    isUserEthAddressType,
    hasPrivateAccess,
    hasPremium,
  } = useAuth();

  const hasConnectWalletMessage = Boolean(
    hasOauthLogin &&
      !hasWeb3Connection &&
      hasPrivateAccess &&
      isUserEthAddressType,
  );

  return (
    <Box className={classes.endpointsList}>
      <RPCEndpoints
        publicChain={publicChain}
        chainType={chainType}
        group={group}
        isPremium={hasPremium}
        hasConnectWalletMessage={hasConnectWalletMessage}
      />
      <WSEndpoints
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
      />
    </Box>
  );
};
