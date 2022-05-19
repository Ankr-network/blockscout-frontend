import React from 'react';

import { ChainNodesTable } from '../ChainNodesTable';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { EndpointQuery } from '../Endpoint/EndpointQuery';
import { SecuritySettingsQuery } from '../Endpoint/SecuritySettingsQuery';
import { useProvider } from 'modules/auth/hooks/useProvider';
import { TrafficFlow } from '../Endpoint/components/TrafficFlow';
import { canAddEndpoint } from 'domains/plan/screens/Dashboard/DashboardUtils';
import { useStyles } from './InfrastructureContentStyles';

interface IInfrastructureContentProps {
  chainId: string;
  data: IChainItemDetails;
}

export const InfrastructureContent = ({
  chainId,
  data,
}: IInfrastructureContentProps) => {
  const classes = useStyles();

  const { credentials, loading: authLoading } = useAuth();
  const { providerData, loading: providerLoading } = useProvider();
  const { nodes, nodesWeight } = data;

  return (
    <div className={classes.root}>
      {canAddEndpoint(providerData, chainId) && <TrafficFlow />}

      {!authLoading && !providerLoading && (
        <>
          {credentials && Boolean(providerData) && (
            <EndpointQuery chainId={chainId} />
          )}

          {credentials && <SecuritySettingsQuery chainId={chainId} />}
        </>
      )}
      {nodes && (
        <div className={classes.table}>
          <ChainNodesTable data={nodes} nodesWeight={nodesWeight} />
        </div>
      )}
    </div>
  );
};
