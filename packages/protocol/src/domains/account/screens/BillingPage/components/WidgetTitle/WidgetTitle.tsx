import { Typography } from '@mui/material';

export interface WidgetTitleProps {
  className?: string;
  children: string;
}

export const WidgetTitle = ({ className, children }: WidgetTitleProps) => (
  <Typography className={className} component="div" variant="subtitle1">
    {children}
  </Typography>
);
