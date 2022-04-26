import React, { useMemo } from 'react';
import { useStyles } from './ChainItemStyles';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { ChainNodesTable } from './components/ChainNodesTable';
import { RequestsMap } from './components/RequestsMap';
// eslint-disable-next-line import/no-cycle
import { useChainItemBreadcrumbs, useTimeframeData } from './useChainItem';
import { IChainItemDetails } from '../../actions/fetchChain';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { ChainBanner } from './components/ChainBanner';
import { H1Tag } from 'uiKit/H1Tag';
import { getChainName } from 'uiKit/utils/useMetatags';
import { t } from 'common';

const ENABLE_CHAIN_NODES_TABLE = true;

interface IChainItemUIProps {
  data: IChainItemDetails;
  chainId: string;
}

export const ChainItem = ({ data, chainId }: IChainItemUIProps) => {
  const { credentials, loading: authLoading } = useAuth();
  const classes = useStyles();

  useChainItemBreadcrumbs(data.chain.name);

  const { chain, nodes, nodesWeight } = data;
  const {
    timeframe,
    setTimeframe,
    loading,
    pristine,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    countries,
    error,
  } = useTimeframeData(chainId);

  const name = useMemo(() => getChainName(chainId), [chainId]);

  return (
    <>
      <div className={classes.chainDetailsWrapper}>
        <H1Tag title={t('meta.chain-item.h1-tag', { chainId: name })} />
        <ChainItemHeader
          className={classes.chainItemHeader}
          chain={chain}
          chainId={chainId}
          hasCredentials={Boolean(credentials)}
          icon={chain.icon}
          nodes={nodes}
          loading={authLoading}
        />

        {!credentials && !authLoading && (
          <ChainBanner className={classes.chainBanner} />
        )}

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
              pristine={pristine}
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
              <RequestsMap countries={countries} />
            )}
          </>
        )}
        {ENABLE_CHAIN_NODES_TABLE && (
          <ChainNodesTable data={nodes} nodesWeight={nodesWeight} />
        )}
      </div>
    </>
  );
};
