import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ISvgIconProps } from '@ankr.com/ui/dist/icons/withSvgIcon';
import { Skeleton, Typography } from '@mui/material';

import { Placeholder } from 'modules/common/components/Placeholder';
import { TPrimitive } from 'modules/common/types';
import { TextTooltip, useTooltip } from 'modules/common/components/TextTooltip';

import { useSummaryStyles } from './useSummaryStyles';

type IconProps = Omit<ISvgIconProps, 'ref'>;
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<any>>;

export interface ISummaryProps {
  Icon: IconComponent;
  children: TPrimitive;
  isLoading?: boolean;
  title: string;
  tooltip?: string;
}

export const Summary = ({
  Icon,
  children,
  isLoading = false,
  title,
  tooltip = '',
}: ISummaryProps) => {
  const tooltipProps = useTooltip();

  const { classes } = useSummaryStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Icon className={classes.icon} size={20} />
        <Typography variant="body2">{title}</Typography>
      </div>
      <TextTooltip
        {...tooltipProps}
        disableHoverListener={!tooltip}
        title={tooltip}
      >
        <Typography component="div" className={classes.content} variant="h6">
          <Placeholder
            hasPlaceholder={isLoading}
            placeholder={
              <Skeleton className={classes.skeleton} variant="rounded" />
            }
          >
            {children}
          </Placeholder>
        </Typography>
      </TextTooltip>
    </div>
  );
};
