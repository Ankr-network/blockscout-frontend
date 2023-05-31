import { Typography } from '@mui/material';

import { Title } from '../Title';
import { useTimeframe30DTitleStyles } from './Timeframe30DTitleStyles';

export interface TimeframedTitleProps {
  children: string;
  className?: string;
}

export const Timeframe30DTitle = ({
  children,
  className,
}: TimeframedTitleProps) => {
  const { classes, cx } = useTimeframe30DTitleStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Title>{children}</Title>
      <Typography className={classes.timeframe} variant="body2">
        30d
      </Typography>
    </div>
  );
};
