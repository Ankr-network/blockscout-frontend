import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { useBannerBoxStyles } from './useBannerBoxStyles';

export interface IBannerBoxProps {
  children: ReactNode;
  className?: string;
}

export const BannerBox = ({ children, className }: IBannerBoxProps) => {
  const { classes, cx } = useBannerBoxStyles();

  return <Box className={cx(classes.root, className)}>{children}</Box>;
};
