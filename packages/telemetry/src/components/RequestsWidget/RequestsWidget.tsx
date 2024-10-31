import { Header } from './components/Header';
import { RequestsChart, RequestsChartProps } from '../RequestsChart';
import { IChartData } from '../Chart';
import { Timeframe, TranslationRequestWidget } from '../../types';
import { SxProps, Theme } from '@mui/material';

export interface RequestsWidgetProps {
  NoDataPlaceholder?: RequestsChartProps['NoDataPlaceholder'];
  className?: string;
  data: IChartData[];
  timeframe: Timeframe;
  isLoading: boolean;
  sx?: SxProps<Theme>;
  translation?: TranslationRequestWidget;
}

export const RequestsWidget = ({
  NoDataPlaceholder,
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
          allRequestsTitle={translation.allRequestsTitle}
          isLoading={isLoading}
          requestsTitle={translation.requestsTitle}
          title={translation.title}
        />
      }
    />
  );
};
