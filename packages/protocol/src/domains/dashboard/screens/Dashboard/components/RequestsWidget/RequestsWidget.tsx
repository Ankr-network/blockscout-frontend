import { IChartData } from 'modules/common/components/Chart';
import {
  RequestsChart,
  Timeframe,
} from 'modules/common/components/RequestsChart';
import { selectTotalStatsLoading } from 'domains/dashboard/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { Header } from './components/Header';

export interface RequestsWidgetProps {
  allTimeRequestsNumber: number;
  className: string;
  data: IChartData[];
  timeframe: Timeframe;
  totalRequestsNumber: number;
}

export const RequestsWidget = ({
  allTimeRequestsNumber,
  className,
  data = [],
  timeframe,
  totalRequestsNumber,
}: RequestsWidgetProps) => {
  const isLoading = useAppSelector(selectTotalStatsLoading);

  return (
    <RequestsChart
      className={className}
      data={data}
      isLoading={isLoading}
      timeframe={timeframe}
      title={
        <Header
          allTimeRequests={allTimeRequestsNumber}
          requests={totalRequestsNumber}
          timeframe={timeframe}
        />
      }
    />
  );
};
