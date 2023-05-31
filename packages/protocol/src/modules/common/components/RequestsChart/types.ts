import { ReactNode } from 'react';

import { IChartData } from '../Chart';

export interface RequestsChartProps {
  className?: string;
  data: IChartData[];
  hasFixedHeight?: boolean;
  isLoading?: boolean;
  timeframe: Timeframe;
  title: ReactNode;
}

export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}
