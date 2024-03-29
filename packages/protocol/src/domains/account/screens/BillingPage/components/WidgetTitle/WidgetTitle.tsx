import { Typography } from '@mui/material';

export interface WidgetTitleProps {
  className?: string;
  children: string;
}

export const WidgetTitle = ({ className, children }: WidgetTitleProps) => (
  <Typography
    className={className}
    color="text"
    component="div"
    variant="subtitle1"
  >
    {children}
  </Typography>
);
