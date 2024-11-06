import { Header } from './components/Header';
import { RequestsChart, RequestsChartProps } from '../RequestsChart';
import { IChartData } from '../Chart';
import { Timeframe, TranslationRequestWidget } from '../../types';
import { SxProps, Theme } from '@mui/material';

export interface RequestsWidgetProps {
  NoDataPlaceholder?: RequestsChartProps['NoDataPlaceholder'];
  allTimeTotalRequestsLoading?: boolean;
  className?: string;
  data: IChartData[];
  isLoading: boolean;
  sx?: SxProps<Theme>;
  timeframe: Timeframe;
  translation?: TranslationRequestWidget;
}

export const RequestsWidget = ({
  NoDataPlaceholder,
  allTimeTotalRequestsLoading,
  sx,
  className,
  data = [],
  timeframe,
  isLoading,
  translation = {
    date: (value: Date) => `date ${value}`,
    time: (value: Date) => `time ${value}`,
    callsCount: (value: number) => `callsCount ${value}`,
    title: 'Title',
    placeholderTitle: 'placeholderTitle',
    placeholderSubtitle: 'placeholderSubtitle',
    requestsTitle: 'placeholderSubtitle',
    allRequestsTitle: 'allRequestsTitle',
  },
}: RequestsWidgetProps) => {
  return (
    <RequestsChart
      NoDataPlaceholder={NoDataPlaceholder}
      className={className}
      isLoading={isLoading}
      timeframe={timeframe}
      data={data}
      sx={sx}
      translation={translation}
      title={
        <Header
          allRequestsLoading={allTimeTotalRequestsLoading}
          allRequestsTitle={translation.allRequestsTitle}
          isLoading={isLoading}
          requestsTitle={translation.requestsTitle}
          title={translation.title}
        />
      }
    />
  );
};
