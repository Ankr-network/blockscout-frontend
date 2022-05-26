import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { InformationIcon } from '../Icons/InformationIcon';
import {
  TooltipElement,
  useTooltipWrapperStyles,
} from './TooltipWrapperStyles';

interface ITooltipWrapperProps {
  children?: ReactNode;
  className?: string;
  hasIcon?: boolean;
  iconClassName?: string;
  tooltipClassName?: string;
  tooltipText: NonNullable<ReactNode | string>;
}

export const TooltipWrapper = ({
  children,
  className,
  hasIcon = true,
  iconClassName,
  tooltipClassName: tooltip,
  tooltipText,
}: ITooltipWrapperProps) => {
  const classes = useTooltipWrapperStyles();

  return (
    <TooltipElement classes={{ tooltip }} placement="top" title={tooltipText}>
      <div className={classNames(classes.tooltipItem, className)}>
        {children}
        {hasIcon && (
          <InformationIcon
            className={classNames(classes.informationIcon, iconClassName)}
          />
        )}
      </div>
    </TooltipElement>
  );
};
