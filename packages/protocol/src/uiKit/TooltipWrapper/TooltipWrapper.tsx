import React, { ReactNode } from 'react';

import { InformationIcon } from '../Icons/InformationIcon';
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
      <div className={cx(classes.tooltipItem, className)}>
        {children}
        {hasIcon &&
          (tipIcon || (
            <InformationIcon
              className={cx(classes.informationIcon, iconClassName)}
            />
          ))}
      </div>
    </TooltipElement>
  );
};
