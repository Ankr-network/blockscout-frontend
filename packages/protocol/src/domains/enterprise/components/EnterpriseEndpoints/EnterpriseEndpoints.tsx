import { t } from '@ankr.com/common';
import { Box } from '@mui/material';

import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { Chain, ChainType } from 'domains/chains/types';
import {
  Feature,
  MainEndpoints,
} from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/MainEndpoints';
import { WsFeatureEndpoints } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/WsFeatureEndpoints';
import { root } from 'domains/chains/screens/ChainItem/components/GetStartedSection/const';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';
import { useWsFeatureEndpoints } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/WsFeatureEndpoints/useWsFeatureEndpoints';
import { useEndpointsStyles } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/Endpoints/EndpointsStyles';

import { useAvailableSubChainId } from '../../hooks/useAvailableSubchainId';

interface EnterpriseEndpointsProps {
  group: EndpointGroup;
  chainType: ChainType;
  publicChain: Chain;
}

export const EnterpriseEndpoints = ({
  group,
  chainType,
  publicChain,
}: EnterpriseEndpointsProps) => {
  const { hasConnectWalletMessage } = useAuth();
  const onCopyEndpoint = useCopyEndpointHandler(chainType);

  const { enterpriseWss } = useWsFeatureEndpoints(group);

  const { classes } = useEndpointsStyles();

  const { isSubChainAvailable } = useAvailableSubChainId({
    publicChain,
    chainType,
    group,
  });

  return (
    <Box className={classes.endpointsList}>
      <MainEndpoints
        feature={Feature.ENTERPRISE}
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
        hasPremium={false}
        hasPrivateAccess
        onCopyEndpoint={onCopyEndpoint}
        publicChain={publicChain}
      />
      <WsFeatureEndpoints
        title={t(`${root}.endpoints.websocket-title`)}
        hasPremium
        hasConnectWalletMessage={hasConnectWalletMessage}
        onCopyEndpoint={onCopyEndpoint}
        hasWSFeature={isSubChainAvailable && publicChain.hasWSFeature}
        wss={enterpriseWss}
      />
    </Box>
  );
};
