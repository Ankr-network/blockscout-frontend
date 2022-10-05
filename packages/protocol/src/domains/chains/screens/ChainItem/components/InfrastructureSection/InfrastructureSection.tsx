import { useMemo } from 'react';
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
  const classes = useInfrastructureSectionStyles();

  const { credentials, loading: authLoading } = useAuth();
  const { providerData, loading: providerLoading } = useProvider();
  const { chains } = group;

  const chainId = useMemo(() => chains[0]?.id, [chains]);

  return (
    <div className={classes.root}>
      {chainId && (
        <>
          {canAddEndpoint(providerData, chainId) && withMyEndpoints && (
            <TrafficFlow />
          )}

          {!authLoading && !providerLoading && (
            <>
              {credentials && Boolean(providerData) && withMyEndpoints && (
                <EndpointQuery chainId={chain.id} />
              )}

              {credentials && <SecuritySettingsQuery chainId={chainId} />}
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
