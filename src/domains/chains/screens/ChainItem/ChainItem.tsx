import React from 'react';
import { useStyles } from './ChainItemStyles';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { ChainNodesTable } from './components/ChainNodesTable';
import { RequestsMap } from './components/RequestsMap';
import { useChainItemBreadcrumbs, useTimeframeData } from './useChainItem';
import { IChainItemDetails } from '../../actions/fetchChain';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { QueryError } from 'modules/common/components/QueryError/QueryError';

const ENABLE_CHAIN_NODES_TABLE = true;

interface IChainItemUIProps {
  data: IChainItemDetails;
  chainId: string;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const { credentials } = useAuth();
  const classes = useStyles();

  useChainItemBreadcrumbs(data.chain.name);

  const { chain, nodes, nodesWeight, userCountryCode = '' } = data;
  const {
    timeframe,
    setTimeframe,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    countries,
    error,
  } = useTimeframeData(chainId);

  return (
    <div className={classes.chainDetailsWrapper}>
      <ChainItemHeader
        className={classes.chainItemHeader}
        chain={chain}
        chainId={chainId}
        hasCredentials={Boolean(credentials)}
        icon={chain.icon}
        nodes={nodes}
      />
      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <>
          <ChainRequestsOverview
            className={classes.chainRequestsOverview}
            totalRequestsHistory={totalRequestsHistory}
            onClick={setTimeframe}
            timeframe={timeframe}
            loading={loading}
          >
            <ChainItemDetails
              className={classes.chainItemDetails}
              totalCached={totalCached}
              totalRequests={totalRequests}
              timeframe={timeframe}
              loading={loading}
            />
          </ChainRequestsOverview>
          {countries && Object.keys(countries).length !== 0 && (
            <RequestsMap
              countries={countries}
              userCountryCode={userCountryCode}
            />
          )}
        </>
      )}
      {ENABLE_CHAIN_NODES_TABLE && (
        <ChainNodesTable data={nodes} nodesWeight={nodesWeight} />
      )}
    </div>
  );
};
