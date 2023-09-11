import { useProjectSelect } from 'modules/common/components/ProjectSelect/hooks/useProjectSelect';

import { ChainLayoutProps } from './types';
import { EmptyLayoutGuard } from '../EmptyLayoutGuard';
import { LocationsWidget } from '../LocationsWidget';
import { MethodCallsWidget } from '../MethodCallsWidget';
import { RequestsByIpWidget } from '../RequestsByIpWidget';
import { RequestsWidget } from '../RequestsWidget';
import { TopCountriesWidget } from '../TopCountriesWidget';
import { useChainData } from './hooks/useChainData';
import { useChainLayoutStyles } from './ChainLayoutStyles';

export const ChainLayout = ({
  statsChainId,
  detailsChainId,
  timeframe,
}: ChainLayoutProps) => {
  const {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    chainStats,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
    methodCalls,
  } = useChainData({ statsChainId, detailsChainId, timeframe });

  const { hasSelectedProject } = useProjectSelect();

  const { classes } = useChainLayoutStyles(hasSelectedProject);

  return (
    <EmptyLayoutGuard data={requestsChartData}>
      <div className={classes.root}>
        <RequestsWidget
          allTimeRequestsNumber={allTimeTotalRequestsNumber}
          className={classes.requests}
          data={requestsChartData}
          timeframe={timeframe}
          totalRequestsNumber={totalRequestsNumber}
        />
        <MethodCallsWidget
          className={classes.methods}
          total={chainStats?.total.count}
          requests={methodCalls}
          timeframe={timeframe}
          chainId={detailsChainId}
        />
        {!hasSelectedProject && (
          <RequestsByIpWidget
            className={classes.ipRequests}
            data={ipRequests}
          />
        )}
        <LocationsWidget
          className={classes.locations}
          isLoading={areLocationsLoading}
          locations={locations}
        />
        {!hasSelectedProject && (
          <TopCountriesWidget className={classes.countries} data={countries} />
        )}
      </div>
    </EmptyLayoutGuard>
  );
};
