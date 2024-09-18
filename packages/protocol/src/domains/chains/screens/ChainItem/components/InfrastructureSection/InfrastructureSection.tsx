import { useEffect, useMemo } from 'react';
import { Chain, ChainSubType, ChainType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';
import { useLazyInfrastructureFetchEndpointsQuery } from 'domains/infrastructure/actions/fetchEndpoints';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';

import { ChainNodesTableQuery } from '../ChainNodesTable';
import { HybridInfrastructure } from './components/HybridInfrastructure';
import { SecuritySection } from './components/SecuritySection';
import { TrafficFlow } from './components/TrafficFlow';
import { canAddEndpoint } from './components/HybridInfrastructure/components/EndpointInfo/EndpointUtils';
import { getStatsChainId } from '../ChainItemSections/utils/getStatsChainId';
import { useInfrastructureSectionStyles } from './InfrastructureSectionStyles';
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
  chainSubType,
  chainType,
  group,
  withMyEndpoints = true,
  withNodes = true,
}: InfrastructureSectionProps) => {
  const [fetchEndpoints] = useLazyInfrastructureFetchEndpointsQuery();
  const { chainProtocol, isChainProtocolSwitchEnabled } =
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
    hasPremium,
    loading: authLoading,
    workerTokenData,
  } = useAuth();
  const {
    handleFetchProvider,
    isLoading: providerLoading,
    providerData,
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
