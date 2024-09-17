import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { useWidgetStyles } from './useWidgetStyles';

export interface IWidgetProps {
  children: ReactNode;
  className?: string;
}

export const Widget = ({ children, className }: IWidgetProps) => {
  const { classes, cx } = useWidgetStyles();

  return <Box className={cx(classes.root, className)}>{children}</Box>;
};
