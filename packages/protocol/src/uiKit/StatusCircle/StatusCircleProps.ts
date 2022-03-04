import { BoxProps } from '@material-ui/core';

export type StatusCircleStatus = 'success' | 'warning' | 'info' | 'error';
export type StatusCircleSize = 'sm';
export type StatusCircleProps = {
  size?: StatusCircleSize;
  status?: StatusCircleStatus;
  color?: string;
} & BoxProps;
