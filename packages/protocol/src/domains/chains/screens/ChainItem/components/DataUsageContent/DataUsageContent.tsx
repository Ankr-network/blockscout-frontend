import React from 'react';

import { ChainItemDetails } from '../ChainItemDetails';
import { ChainRequestsOverview } from '../ChainRequestsOverview';
import { MethodsRating } from '../MethodsRating';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { RequestsMap } from '../RequestsMap';
import { useStyles } from './DataUsageContentStyles';
import { useUsageData } from './hooks/useUsageData';
import { UsageSummary } from '../UsageSummary';

interface IDataUsageContentProps {
  chainId: string;
}

export const DataUsageContent = ({ chainId }: IDataUsageContentProps) => {
  const classes = useStyles();

  const {
    countries,
    error,
    isWalletConnected,
    loading,
    methodRequests,
    pristine,
    setTimeframe,
    switchStatsTimeframe,
    timeframe,
    totalCached,
    totalRequests,
    totalRequestsHistory,
  } = useUsageData(chainId);

  return (
    <div>
      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <>
          {isWalletConnected && (
            <UsageSummary className={classes.usageSummary} chainId={chainId} />
          )}
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
              isWalletConnected={isWalletConnected}
              loading={loading}
              timeframe={timeframe}
              totalCached={totalCached}
              totalRequests={totalRequests}
            />
          </ChainRequestsOverview>
          {countries && Object.keys(countries).length !== 0 && (
            <RequestsMap countries={countries} />
          )}
          {isWalletConnected && methodRequests.length > 0 && (
            <MethodsRating
              methodRequests={methodRequests}
              switchStatsTimeframe={switchStatsTimeframe}
              timeframe={timeframe}
            />
          )}
        </>
      )}
    </div>
  );
};
