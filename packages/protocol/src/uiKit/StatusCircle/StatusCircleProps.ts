import { BoxProps } from '@mui/material';

export type StatusCircleStatus = 'success' | 'warning' | 'info' | 'error';

type StatusCircleSize = 'sm' | 'md';

export type StatusCircleProps = {
  size?: StatusCircleSize;
  status?: StatusCircleStatus;
  color?: string;
} & BoxProps;
