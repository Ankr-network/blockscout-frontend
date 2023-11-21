import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { usePaperBlockStyles } from './usePaperBlockStyles';

interface PaperBlockProps {
  className?: string;
  children: ReactNode;
}

export const PaperBlock = ({ className, children }: PaperBlockProps) => {
  const { cx, classes } = usePaperBlockStyles();

  return <Paper className={cx(classes.root, className)}>{children}</Paper>;
};
