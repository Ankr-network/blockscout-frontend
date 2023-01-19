export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}

export interface RequestsChartProps {
  isChartDataLoading: boolean;
  timeframe: Timeframe;
  totalRequestsHistory?: Record<string, number>;
}
