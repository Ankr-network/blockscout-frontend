import { ReactNode } from 'react';

import { IChartData } from '../Chart';

export interface RequestsChartProps {
  className?: string;
  data: IChartData[];
  isLoading?: boolean;
  timeframe: Timeframe;
  title?: ReactNode;
  isFlexibleHeight?: boolean;
}

export enum Timeframe {
  Hour,
  Day,
  Week,
  Month,
}
