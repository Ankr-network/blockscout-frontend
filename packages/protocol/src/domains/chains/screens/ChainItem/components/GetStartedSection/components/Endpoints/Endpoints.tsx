import { Box } from '@mui/material';
import { useMemo } from 'react';

import { t } from '@ankr.com/common';
import { root } from '../../const';
import { ChainType } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { Feature, MainEndpoints } from '../MainEndpoints';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useCopyEndpointHandler } from 'domains/chains/hooks/useCopyEndpointHandler';
import { useEndpointsStyles } from './EndpointsStyles';
import { WsFeatureEndpoints } from '../WsFeatureEndpoints';
import { EndpointPlaceholder } from '../EndpointPlaceholder';
import { EndpointsHeader } from '../EndpointsHeader';

export interface EndpointsProps {
  publicChain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
}

const title = t(`${root}.endpoints.websocket-title`);
const header = `${root}.endpoints.title`;

const checkComingSoonLabel = (publicChain: IApiChain, chainType: ChainType) => {
  switch (chainType) {
    case ChainType.Mainnet:
      return publicChain.isComingSoon;

    case ChainType.Testnet:
      return publicChain?.testnets?.[0]?.isComingSoon;

    case ChainType.Devnet:
      return publicChain?.devnets?.[0]?.isComingSoon;

    default:
      return false;
  }
};

export const Endpoints = ({
  publicChain,
  chainType,
  group,
}: EndpointsProps) => {
  const { classes } = useEndpointsStyles();

  const { hasConnectWalletMessage, hasPremium, hasPrivateAccess } = useAuth();

  const onCopyEndpoint = useCopyEndpointHandler(chainType);

  const hasComingSoonLabel = useMemo(
    () => checkComingSoonLabel(publicChain, chainType),
    [publicChain, chainType],
  );

  return (
    <Box className={classes.endpointsList}>
      {hasComingSoonLabel ? (
        <EndpointPlaceholder
          title={
            <EndpointsHeader
              title={t(header, { chainName: group.chainName, rpcs: 1 })}
            />
          }
          label={t('chains.coming-soon')}
        />
      ) : (
        <>
          <MainEndpoints
            feature={Feature.RPC}
            group={group}
            hasConnectWalletMessage={hasConnectWalletMessage}
            hasPremium={hasPremium}
            hasPrivateAccess={hasPrivateAccess}
            onCopyEndpoint={onCopyEndpoint}
            publicChain={publicChain}
          />
          <MainEndpoints
            feature={Feature.REST}
            group={group}
            hasConnectWalletMessage={hasConnectWalletMessage}
            hasPremium={hasPremium}
            hasPrivateAccess={hasPrivateAccess}
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
        </>
      )}
    </Box>
  );
};
