import { t } from '@ankr.com/common';
import classNames from 'classnames';
import { cloneElement, ReactElement } from 'react';

import { useYieldSliderStyles } from './useYieldSliderStyles';

interface IValueLabelProps {
  children: ReactElement;
  open: boolean;
  value: number;
}

export const ValueLabel = ({
  children,
  open,
  value,
}: IValueLabelProps): JSX.Element => {
  const classes = useYieldSliderStyles();

  const renderedTooltip = (
    <span
      className={classNames(classes.tooltip, {
        [classes.tooltipOpen]: open,
      })}
    >
      {t('unit.days-value', { value })}

      <i className={classes.tooltipTail} />
    </span>
  );

  return cloneElement(children, { children: renderedTooltip });
};
