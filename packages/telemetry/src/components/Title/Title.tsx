import { Typography } from '@mui/material';

import { useTitleStyles } from './TitleStyles';

export interface TitleProps {
  children?: string | number;
  className?: string;
}

export const Title = ({ className, children }: TitleProps) => {
  const { classes, cx } = useTitleStyles();

  return (
    <Typography className={cx(classes.root, className)} variant="h6">
      {children}
    </Typography>
  );
};
