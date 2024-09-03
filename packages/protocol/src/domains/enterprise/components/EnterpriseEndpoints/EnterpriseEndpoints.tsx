import { t } from '@ankr.com/common';
import { Box } from '@mui/material';

import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { Chain, ChainType } from 'modules/chains/types';
import { root } from 'modules/common/components/GetStartedSection/const';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';
import { hasWsFeature } from 'domains/projects/utils/hasWsFeature';
import { useEndpointsStyles } from 'modules/common/components/GetStartedSection/components/Endpoints/EndpointsStyles';
import { useWsFeatureEndpoints } from 'modules/common/components/GetStartedSection/components/WsFeatureEndpoints/useWsFeatureEndpoints';
import { WsFeatureEndpoints } from 'modules/common/components/GetStartedSection/components/WsFeatureEndpoints';
import {
  Feature,
  MainEndpoints,
} from 'modules/common/components/GetStartedSection/components/MainEndpoints';

interface EnterpriseEndpointsProps {
  group: EndpointGroup;
  chainType: ChainType;
  publicChain: Chain;
}

export const EnterpriseEndpoints = ({
  chainType,
  group,
  publicChain,
}: EnterpriseEndpointsProps) => {
  const { hasConnectWalletMessage } = useAuth();
  const onCopyEndpoint = useCopyEndpointHandler(chainType);

  const { enterpriseWss } = useWsFeatureEndpoints(group);

  const { classes } = useEndpointsStyles();

  return (
    <Box className={classes.endpointsList}>
      <MainEndpoints
        feature={Feature.ENTERPRISE}
        group={group}
        hasConnectWalletMessage={hasConnectWalletMessage}
        hasPremium
        hasPrivateAccess
        onCopyEndpoint={onCopyEndpoint}
        publicChain={publicChain}
      />
      <WsFeatureEndpoints
        title={t(`${root}.endpoints.websocket-title`)}
        hasPremium
        hasConnectWalletMessage={hasConnectWalletMessage}
        onCopyEndpoint={onCopyEndpoint}
        hasWSFeature={hasWsFeature(publicChain)}
        wss={enterpriseWss}
      />
    </Box>
  );
};
