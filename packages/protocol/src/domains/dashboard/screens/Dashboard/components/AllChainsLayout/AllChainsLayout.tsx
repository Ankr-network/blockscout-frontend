import { ChainCallsWidget } from '../ChainCallsWidget';
import { EmptyLayoutGuard } from '../EmptyLayoutGuard';
import { ILayoutProps } from '../../types';
import { LocationsWidget } from '../LocationsWidget';
import { ProjectsWidget } from '../ProjectsWidget';
import { RequestsByIpWidget } from '../RequestsByIpWidget';
import { RequestsWidget } from '../RequestsWidget';
import { TopCountriesWidget } from '../TopCountriesWidget';
import { UsageHistoryWidget } from '../UsageHistoryWidget';
import { useAllChainsData } from './hooks/useAllChainsData';
import { useAllChainsLayoutStyles } from './AllChainsLayoutStyles';
import { useMonthlyStats } from '../../hooks/useMonthlyStats';

export const AllChainsLayout = ({ timeframe }: ILayoutProps) => {
  const { classes } = useAllChainsLayoutStyles();

  const {
    allTimeTotalRequestsNumber,
    areLocationsLoading,
    countries,
    ipRequests,
    locations,
    requestsChartData,
    totalRequestsNumber,
  } = useAllChainsData(timeframe);

  const { data: monthlyStats = [] } = useMonthlyStats();

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
        <ChainCallsWidget className={classes.calls} />
        <ProjectsWidget className={classes.projects} timeframe={timeframe} />
        <RequestsByIpWidget className={classes.ipRequests} data={ipRequests} />
        <LocationsWidget
          className={classes.locations}
          isLoading={areLocationsLoading}
          locations={locations}
        />
        <TopCountriesWidget className={classes.countries} data={countries} />
        <UsageHistoryWidget className={classes.history} data={monthlyStats} />
      </div>
    </EmptyLayoutGuard>
  );
};
