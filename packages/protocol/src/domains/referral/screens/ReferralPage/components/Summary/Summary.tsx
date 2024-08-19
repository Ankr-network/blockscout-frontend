import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ISvgIconProps } from '@ankr.com/ui/dist/icons/withSvgIcon';
import { Typography } from '@mui/material';

import { useSummaryStyles } from './useSummaryStyles';

type IconProps = Omit<ISvgIconProps, 'ref'>;
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<any>>;

export interface ISummaryProps {
  Icon: IconComponent;
  children: string;
  title: string;
}

export const Summary = ({ Icon, children, title }: ISummaryProps) => {
  const { classes } = useSummaryStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Icon className={classes.icon} size={20} />
        <Typography variant="body2">{title}</Typography>
      </div>
      <Typography component="div" className={classes.content} variant="h6">
        {children}
      </Typography>
    </div>
  );
};
