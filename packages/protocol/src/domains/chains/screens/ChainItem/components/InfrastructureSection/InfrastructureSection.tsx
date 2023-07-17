import { useEffect, useMemo } from 'react';

import { Chain, ChainSubType, ChainType } from 'domains/chains/types';
import { ChainNodesTableQuery } from '../ChainNodesTable';
import { EndpointGroup } from 'modules/endpoints/types';
import { HybridInfrastructure } from './components/HybridInfrastructure';
import { SecuritySection } from './components/SecuritySection';
import { TrafficFlow } from './components/TrafficFlow';
import { canAddEndpoint } from './components/HybridInfrastructure/components/EndpointInfo/EndpointUtils';
import { getStatsChainId } from '../ChainItemSections/utils/getStatsChainId';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { useInfrastructureSectionStyles } from './InfrastructureSectionStyles';
import { useLazyInfrastructureFetchEndpointsQuery } from 'domains/infrastructure/actions/fetchEndpoints';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { ChainNodesLocations } from '../ChainNodesLocations';
import { checkPrivateChainsAndGetChainId } from '../UsageDataSection/const';

export interface InfrastructureSectionProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  withMyEndpoints?: boolean;
  withNodes?: boolean;
}

const HAS_NODES_TABLE = false;

export const InfrastructureSection = ({
  chain,
  chainType,
  chainSubType,
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
    chainSubType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const { classes } = useInfrastructureSectionStyles();

  const {
    hasInfrastructureAccess,
    loading: authLoading,
    workerTokenData,
    hasPremium,
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

  const hasHybridInfrastructure =
    workerTokenData && Boolean(providerData) && withMyEndpoints;

  const hasSecuritySettings =
    workerTokenData && workerTokenData?.userEndpointToken && hasPremium;

  const resultChainId = useMemo(
    () => checkPrivateChainsAndGetChainId(chainId),
    [chainId],
  );

  return (
    <div>
      {resultChainId && (
        <>
          {canAddEndpoint(providerData, resultChainId) && withMyEndpoints && (
            <TrafficFlow />
          )}

          {!authLoading && !providerLoading && workerTokenData && (
            <>
              {hasHybridInfrastructure && (
                <HybridInfrastructure chainId={resultChainId} />
              )}

              {hasSecuritySettings && (
                <SecuritySection chainId={resultChainId} />
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
