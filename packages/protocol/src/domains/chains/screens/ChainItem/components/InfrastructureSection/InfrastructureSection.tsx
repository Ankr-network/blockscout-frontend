import { useEffect } from 'react';

import { Chain, ChainType } from 'domains/chains/types';
import { ChainNodesTableQuery } from '../ChainNodesTable';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointQuery } from '../Endpoint/EndpointQuery';
import { SecuritySettingsQuery } from '../Endpoint/SecuritySettingsQuery';
import { TrafficFlow } from '../Endpoint/components/TrafficFlow';
import { canAddEndpoint } from '../Endpoint/EndpointUtils';
import { getStatsChainId } from '../ChainItemSections/utils/getStatsChainId';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { useInfrastructureSectionStyles } from './InfrastructureSectionStyles';
import { useLazyInfrastructureFetchEndpointsQuery } from 'domains/infrastructure/actions/fetchEndpoints';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { ChainNodesLocations } from '../ChainNodesLocations';

export interface InfrastructureSectionProps {
  chain: Chain;
  chainType: ChainType;
  group: EndpointGroup;
  withMyEndpoints?: boolean;
  withNodes?: boolean;
}

const HAS_NODES_TABLE = false;

export const InfrastructureSection = ({
  chain,
  chainType,
  group,
  withMyEndpoints = true,
  withNodes = true,
}: InfrastructureSectionProps) => {
  const [fetchEndpoints] = useLazyInfrastructureFetchEndpointsQuery();
  const { isChainProtocolSwitchEnabled, chainProtocol } =
    useChainProtocolContext();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const { classes } = useInfrastructureSectionStyles();

  const {
    hasInfrastructureAccess,
    loading: authLoading,
    workerTokenData,
  } = useAuth();
  const {
    providerData,
    isLoading: providerLoading,
    handleFetchProvider,
  } = useProvider();

  useEffect(() => {
    if (hasInfrastructureAccess) {
      handleFetchProvider().then(() => {
        fetchEndpoints();
      });
    }
  }, [handleFetchProvider, fetchEndpoints, hasInfrastructureAccess]);

  return (
    <div>
      {chainId && (
        <>
          {canAddEndpoint(providerData, chainId) && withMyEndpoints && (
            <TrafficFlow />
          )}

          {!authLoading && !providerLoading && workerTokenData && (
            <>
              {workerTokenData && Boolean(providerData) && withMyEndpoints && (
                <EndpointQuery chainId={chainId} />
              )}

              {workerTokenData && workerTokenData?.userEndpointToken && (
                <SecuritySettingsQuery chainId={chainId} />
              )}
            </>
          )}
        </>
      )}

      {HAS_NODES_TABLE && withNodes && (
        <div className={classes.table}>
          <ChainNodesTableQuery chainId={chainId} />
        </div>
      )}

      <div className={classes.table}>
        <ChainNodesLocations chainId={chainId} />
      </div>
    </div>
  );
};
