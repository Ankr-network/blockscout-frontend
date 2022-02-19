import { BoxProps } from '@material-ui/core';
import { BaseStatus } from 'uiKit/types/status';

export type StatusCircleStatus = BaseStatus | keyof typeof BaseStatus;
export type StatusCircleSize = 'sm';
export type StatusCircleProps = {
  size?: StatusCircleSize;
  status?: StatusCircleStatus;
  color?: string;
} & BoxProps;
