import React from 'react';

import { ChainItemDetails } from '../ChainItemDetails';
import { ChainRequestsOverview } from '../ChainRequestsOverview';
import { MethodsRating } from '../MethodsRating';
import { RequestsMap } from '../RequestsMap';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { useTimeframeData } from './DataUsageContentUtils';
import { useStyles } from './DataUsageContentStyles';

const IS_MEHTODS_RATING_VISIBLE = false;

interface IDataUsageContentProps {
  chainId: string;
}

export const DataUsageContent = ({ chainId }: IDataUsageContentProps) => {
  const classes = useStyles();

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

  return (
    <div>
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
          {IS_MEHTODS_RATING_VISIBLE && <MethodsRating />}
        </>
      )}
    </div>
  );
};
