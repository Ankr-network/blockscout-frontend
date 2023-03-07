import { Box } from '@mui/material';

import { t } from '@ankr.com/common';
import { root } from '../../const';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { RPCEndpoints } from '../RPCEndpoints';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';
import { useEndpointsStyles } from './EndpointsStyles';
import { WsFeatureEndpoints } from '../WsFeatureEndpoints';

export interface EndpointsProps {
  publicChain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
}

const title = t(`${root}.endpoints.websocket-title`);

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
        hasPremium={hasPremium}
        onCopyEndpoint={onCopyEndpoint}
        publicChain={publicChain}
      />
      <WsFeatureEndpoints
        title={title}
        hasPremium={hasPremium}
        hasConnectWalletMessage={hasConnectWalletMessage}
        onCopyEndpoint={onCopyEndpoint}
        group={group}
      />
    </Box>
  );
};
