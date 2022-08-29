import React from 'react';

import { ChainItemDetails } from '../ChainItemDetails';
import {
  ChainRequestsOverview,
  IS_30D_PRIVATE_STATISTICS_DISABLED,
} from '../ChainRequestsOverview';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { RequestsMap } from '../RequestsMap';
import { UsageSummary } from '../UsageSummary';
import { useStyles } from './DataUsageContentStyles';
import { useUsageData } from './hooks/useUsageData';
import { MethodCalls } from '../MethodCalls';
import { RequestsByIP } from '../RequestsByIP';

interface IDataUsageContentProps {
  chainId: string;
}

export const DataUsageContent = ({ chainId }: IDataUsageContentProps) => {
  const classes = useStyles();

  const {
    countries,
    error,
    isConnecting,
    isWalletConnected,
    loading,
    pristine,
    setTimeframe,
    timeframe,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    userTopRequests,
    userTopRequestsIp,
  } = useUsageData(chainId);

  return (
    <>
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
            isConnecting={isConnecting}
            isWalletConnected={isWalletConnected}
            loading={loading}
            onClick={setTimeframe}
            pristine={pristine}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
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
          {isWalletConnected && userTopRequests && (
            <MethodCalls
              loading={loading}
              data={userTopRequests}
              timeframe={timeframe}
            />
          )}
          {isWalletConnected &&
            userTopRequestsIp &&
            !IS_30D_PRIVATE_STATISTICS_DISABLED && (
              <RequestsByIP loading={loading} data={userTopRequestsIp} />
            )}
          {countries && Object.keys(countries).length !== 0 && (
            <RequestsMap countries={countries} />
          )}
        </>
      )}
    </>
  );
};
