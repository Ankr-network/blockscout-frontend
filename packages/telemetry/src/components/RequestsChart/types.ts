import { ReactNode } from 'react';
import { IChartData } from '../Chart';
import { Timeframe } from '../../types';

export interface RequestsChartProps {
  className?: string;
  data: IChartData[];
  hasFixedHeight?: boolean;
  isLoading?: boolean;
  timeframe: Timeframe;
  title: ReactNode;
}
