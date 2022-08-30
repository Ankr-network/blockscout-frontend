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
}

export const InfrastructureSection = ({
  chain,
  group,
}: InfrastructureSectionProps) => {
  const classes = useInfrastructureSectionStyles();

  const { credentials, loading: authLoading } = useAuth();
  const { providerData, loading: providerLoading } = useProvider();

  return (
    <div className={classes.root}>
      {canAddEndpoint(providerData, chain.id) && <TrafficFlow />}

      {!authLoading && !providerLoading && (
        <>
          {credentials && Boolean(providerData) && (
            <EndpointQuery chainId={chain.id} />
          )}

          {credentials && <SecuritySettingsQuery chainId={chain.id} />}
        </>
      )}

      <div className={classes.table}>
        <ChainNodesTableQuery chain={chain} group={group} />
      </div>
    </div>
  );
};
