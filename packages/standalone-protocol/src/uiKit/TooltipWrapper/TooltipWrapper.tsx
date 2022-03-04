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
}

export const TooltipWrapper = ({
  tooltipText,
  children,
  className,
  hasIcon = true,
}: ITooltipWrapperProps) => {
  const classes = useTooltipWrapperStyles();

  return (
    <TooltipElement placement="top" title={tooltipText}>
      <div className={classNames(classes.tooltipItem, className)}>
        {children}
        {hasIcon && <InformationIcon className={classes.informationIcon} />}
      </div>
    </TooltipElement>
  );
};
