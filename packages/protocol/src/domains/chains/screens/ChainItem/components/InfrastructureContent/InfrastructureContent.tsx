import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useProvider } from 'domains/infrastructure/hooks/useProvider';
import { EndpointGroup } from 'modules/endpoints/types';
import { ChainNodesTableQuery } from '../ChainNodesTable';
import { TrafficFlow } from '../Endpoint/components/TrafficFlow';
import { EndpointQuery } from '../Endpoint/EndpointQuery';
import { canAddEndpoint } from '../Endpoint/EndpointUtils';
import { SecuritySettingsQuery } from '../Endpoint/SecuritySettingsQuery';
import { useStyles } from './InfrastructureContentStyles';

interface IInfrastructureContentProps {
  chain: IApiChain;
  group: EndpointGroup;
}

export const InfrastructureContent = ({
  chain,
  group,
}: IInfrastructureContentProps) => {
  const classes = useStyles();

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
