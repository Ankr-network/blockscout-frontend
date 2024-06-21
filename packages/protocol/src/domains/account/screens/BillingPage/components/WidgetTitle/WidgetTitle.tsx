import { Typography } from '@mui/material';

import { useWidgetTitleStyles } from './useWidgetTitleStyles';

export interface WidgetTitleProps {
  className?: string;
  children: string;
}

export const WidgetTitle = ({ children, className }: WidgetTitleProps) => {
  const { classes, cx } = useWidgetTitleStyles();

  return (
    <Typography
      className={cx(classes.root, className)}
      color="text"
      component="div"
      variant="subtitle1"
    >
      {children}
    </Typography>
  );
};
