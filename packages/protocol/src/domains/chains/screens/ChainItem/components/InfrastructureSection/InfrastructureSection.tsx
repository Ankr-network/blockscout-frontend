import { useEffect, useMemo } from 'react';
import { useDispatchRequest } from '@redux-requests/react';

import { ChainNodesTableQuery } from '../ChainNodesTable';
import { EndpointGroup } from 'modules/endpoints/types';
import { EndpointQuery } from '../Endpoint/EndpointQuery';
import { IApiChain } from 'domains/chains/api/queryChains';
import { SecuritySettingsQuery } from '../Endpoint/SecuritySettingsQuery';
import { TrafficFlow } from '../Endpoint/components/TrafficFlow';
import { canAddEndpoint } from '../Endpoint/EndpointUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInfrastructureSectionStyles } from './InfrastructureSectionStyles';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { fetchEndpoints } from 'domains/infrastructure/actions/fetchEndpoints';
import { fetchProvider } from 'domains/infrastructure/actions/fetchProvider';

export interface InfrastructureSectionProps {
  chain: IApiChain;
  group: EndpointGroup;
  withMyEndpoints?: boolean;
  withNodes?: boolean;
}

export const InfrastructureSection = ({
  chain,
  group,
  withMyEndpoints = true,
  withNodes = true,
}: InfrastructureSectionProps) => {
  const dispatchRequest = useDispatchRequest();

  const classes = useInfrastructureSectionStyles();

  const { credentials, loading: authLoading, workerTokenData } = useAuth();
  const { providerData, loading: providerLoading } = useProvider();
  const { chains } = group;

  useEffect(() => {
    if (credentials && workerTokenData) {
      dispatchRequest(fetchProvider()).then(() =>
        dispatchRequest(fetchEndpoints()),
      );
    }
  }, [dispatchRequest, credentials, workerTokenData]);

  const chainId = useMemo(() => chains[0]?.id, [chains]);

  return (
    <div className={classes.root}>
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

      {withNodes && (
        <div className={classes.table}>
          <ChainNodesTableQuery chain={chain} group={group} />
        </div>
      )}
    </div>
  );
};
