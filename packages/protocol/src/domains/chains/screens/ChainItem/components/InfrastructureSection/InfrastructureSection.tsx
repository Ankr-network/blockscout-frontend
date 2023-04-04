import { useEffect, useMemo } from 'react';

import { ChainNodesTableQuery } from '../ChainNodesTable';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointQuery } from '../Endpoint/EndpointQuery';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SecuritySettingsQuery } from '../Endpoint/SecuritySettingsQuery';
import { TrafficFlow } from '../Endpoint/components/TrafficFlow';
import { canAddEndpoint } from '../Endpoint/EndpointUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInfrastructureSectionStyles } from './InfrastructureSectionStyles';
import { useLazyInfrastructureFetchEndpointsQuery } from 'domains/infrastructure/actions/fetchEndpoints';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { ChainNodesLocations } from '../ChainNodesLocations';

export interface InfrastructureSectionProps {
  chain: IApiChain;
  group: EndpointGroup;
  withMyEndpoints?: boolean;
  withNodes?: boolean;
}

const HAS_NODES_TABLE = false;

export const InfrastructureSection = ({
  chain,
  group,
  withMyEndpoints = true,
  withNodes = true,
}: InfrastructureSectionProps) => {
  const [fetchEndpoints] = useLazyInfrastructureFetchEndpointsQuery();

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
  const { chains } = group;

  useEffect(() => {
    if (hasInfrastructureAccess) {
      handleFetchProvider().then(() => {
        fetchEndpoints();
      });
    }
  }, [handleFetchProvider, fetchEndpoints, hasInfrastructureAccess]);

  const chainId = useMemo(() => chains[0]?.id, [chains]);

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
                <EndpointQuery chainId={chain.id} />
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
