import React, { ReactNode } from 'react';
import { Information } from '@ankr.com/ui';

import {
  TooltipElement,
  useTooltipWrapperStyles,
} from './TooltipWrapperStyles';

interface ITooltipWrapperProps {
  children?: ReactNode;
  className?: string;
  hasIcon?: boolean;
  tipIcon?: ReactNode;
  iconClassName?: string;
  tooltipClassName?: string;
  tooltipText: NonNullable<ReactNode | string>;
}

export const TooltipWrapper = ({
  children,
  className,
  hasIcon = true,
  tipIcon,
  iconClassName,
  tooltipClassName: tooltip,
  tooltipText,
}: ITooltipWrapperProps) => {
  const { classes, cx } = useTooltipWrapperStyles();

  return (
    <TooltipElement classes={{ tooltip }} placement="top" title={tooltipText}>
      <div
        className={cx(classes.tooltipItem, className, {
          [classes.emptyTooltip]: !tooltipText,
        })}
      >
        {children}
        {hasIcon &&
          (tipIcon || (
            <Information
              className={cx(classes.informationIcon, iconClassName)}
            />
          ))}
      </div>
    </TooltipElement>
  );
};
