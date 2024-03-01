import { Typography } from '@mui/material';

import { useWidgetTitleStyles } from './WidgetTitleStyles';

export interface WidgetTitleProps {
  className?: string;
  children: string;
}

export const WidgetTitle = ({ className, children }: WidgetTitleProps) => {
  const { classes, cx } = useWidgetTitleStyles();

  return (
    <Typography
      className={cx(classes.root, className)}
      component="div"
      variant="subtitle2"
    >
      {children}
    </Typography>
  );
};
