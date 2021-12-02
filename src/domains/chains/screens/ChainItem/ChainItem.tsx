import React from 'react';
import { useStyles } from './ChainItemStyles';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { ChainNodesTable } from './components/ChainNodesTable';
import { RequestsMap } from './components/RequestsMap';
import { useIsWXGAPlusDown } from 'modules/themes/useTheme';
import { useChainItem } from './useChainItem';
import { IChainItemDetails } from '../../actions/fetchChain';
import { useAuth } from 'modules/auth/hooks/useAuth';

const ENABLE_CHAIN_NODES_TABLE = false;

interface IChainItemUIProps {
  data: IChainItemDetails;
  chainId: string;
  dataFor7dLoading: boolean;
  dataFor30dLoading: boolean;
}

export const ChainItem = ({
  data,
  chainId,
  dataFor7dLoading,
  dataFor30dLoading,
}: IChainItemUIProps) => {
  const isWXGAPlusDown = useIsWXGAPlusDown();
  const { credentials } = useAuth();
  const {
    totalCached,
    totalRequests,
    timeframe,
    chain,
    totalRequestsCount,
    totalRequestsHistory,
    handleTimeframeClick,
    countries,
    nodes,
    nodesWeight,
  } = useChainItem(data);
  const classes = useStyles();

  const detailsBlock = (
    <ChainItemDetails
      className={classes.chainItemDetails}
      totalCached={totalCached}
      totalRequests={totalRequests}
      timeframe={timeframe}
    />
  );

  return (
    <>
      <div className={classes.chainDetailsWrapper}>
        <ChainItemHeader
          className={classes.chainItemHeader}
          chain={chain}
          chainId={chainId}
          hasCredentials={Boolean(credentials)}
          icon={chain.icon}
          nodes={nodes}
        />
        {isWXGAPlusDown && detailsBlock}
        <ChainRequestsOverview
          className={classes.chainRequestsOverview}
          totalRequests={totalRequestsCount}
          totalRequestsHistory={totalRequestsHistory}
          onClick={handleTimeframeClick}
          timeframe={timeframe}
          dataFor7dLoading={dataFor7dLoading}
          dataFor30dLoading={dataFor30dLoading}
        />
        {countries && Object.keys(countries).length !== 0 && (
          <RequestsMap countries={countries} />
        )}
        {ENABLE_CHAIN_NODES_TABLE && (
          <ChainNodesTable data={nodes} nodesWeight={nodesWeight} />
        )}
      </div>
      {!isWXGAPlusDown && detailsBlock}
    </>
  );
};
