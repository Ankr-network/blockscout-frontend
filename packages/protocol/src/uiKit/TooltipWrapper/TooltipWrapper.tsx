import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { InformationIcon } from '../Icons/InformationIcon';

import {
  useTooltipWrapperStyles,
  TooltipElement,
} from './TooltipWrapperStyles';

interface ITooltipWrapperProps {
  tooltipText: NonNullable<ReactNode | string>;
  children?: ReactNode;
  className?: string;
  hasIcon?: boolean;
  iconClassName?: string;
}

export const TooltipWrapper = ({
  tooltipText,
  children,
  className,
  iconClassName,
  hasIcon = true,
}: ITooltipWrapperProps) => {
  const classes = useTooltipWrapperStyles();

  return (
    <TooltipElement placement="top" title={tooltipText}>
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
