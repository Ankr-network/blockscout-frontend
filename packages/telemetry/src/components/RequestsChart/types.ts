import { ReactNode } from 'react';
import { IChartData } from '../Chart';
import { Timeframe, TranslationRequestWidget } from '../../types';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Placeholder } from './components/Placeholder';

export interface RequestsChartProps {
  NoDataPlaceholder?: typeof Placeholder;
  className?: string;
  data: IChartData[];
  hasFixedHeight?: boolean;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
  timeframe: Timeframe;
  title: ReactNode;
  translation: TranslationRequestWidget;
}
