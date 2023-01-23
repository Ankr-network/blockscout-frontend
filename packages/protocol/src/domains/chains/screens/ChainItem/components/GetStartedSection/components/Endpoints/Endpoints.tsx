import { Box } from '@mui/material';

import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpoints } from '../RPCEndpoints';
import { WSEndpoints } from '../WSEndpoints';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';
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
  const { classes } = useEndpointsStyles();

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

  const onCopyEndpoint = useCopyEndpointHandler(chainType);

  return (
    <Box className={classes.endpointsList}>
      <RPCEndpoints
        chainType={chainType}
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
        isPremium={hasPremium}
        onCopyEndpoint={onCopyEndpoint}
        publicChain={publicChain}
      />
      <WSEndpoints
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
        onCopyEndpoint={onCopyEndpoint}
      />
    </Box>
  );
};
