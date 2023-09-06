import { Header } from './components/Header';
import { RequestsChart } from '../RequestsChart';
import { IChartData } from '../Chart';
import { Timeframe } from '../../types';

export interface RequestsWidgetProps {
  className: string;
  title: string;
  data: IChartData[];
  timeframe: Timeframe;
  isLoading: boolean;
  requestsTitle: string;
  allRequestsTitle: string;
}

export const RequestsWidget = ({
  title,
  className,
  data = [],
  timeframe,
  isLoading,
  requestsTitle,
  allRequestsTitle,
}: RequestsWidgetProps) => {
  return (
    <RequestsChart
      className={className}
      isLoading={isLoading}
      timeframe={timeframe}
      data={data}
      title={
        <Header
          title={title}
          requestsTitle={requestsTitle}
          allRequestsTitle={allRequestsTitle}
        />
      }
    />
  );
};
