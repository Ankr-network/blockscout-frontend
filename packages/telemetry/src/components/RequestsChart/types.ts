import { ReactNode } from 'react';
import { IChartData, IChartProps } from '../Chart';
import { Timeframe } from '../../types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface RequestsChartProps extends Pick<IChartProps, 'translation'> {
  className?: string;
  data: IChartData[];
  hasFixedHeight?: boolean;
  isLoading?: boolean;
  timeframe: Timeframe;
  title: ReactNode;
  sx?: SxProps<Theme>;
}
