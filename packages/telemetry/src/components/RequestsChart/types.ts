import { ReactNode } from 'react';
import { IChartData } from '../Chart';
import { Timeframe, TranslationRequestWidget } from '../../types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface RequestsChartProps {
  className?: string;
  data: IChartData[];
  hasFixedHeight?: boolean;
  isLoading?: boolean;
  timeframe: Timeframe;
  title: ReactNode;
  sx?: SxProps<Theme>;
  translation: TranslationRequestWidget;
}
