import { Tooltip as MUITooltip, TooltipProps } from '@material-ui/core';
import classNames from 'classnames';

import { useTooltipStyles } from './useTooltipStyles';

interface ITooltipProps extends TooltipProps {
  maxHeight?: number;
  variant?: 'light' | 'outlined';
}

export const Tooltip = ({
  maxHeight,
  variant = 'light',
  classes: classesProp,
  ...restProps
}: ITooltipProps): JSX.Element => {
  const classes = useTooltipStyles({ maxHeight });
  const isLightVariant = variant === 'light';
  const isOutlinedVariant = variant === 'outlined';

  return (
    <MUITooltip
      classes={{
        ...classesProp,
        tooltip: classNames(classesProp?.tooltip, classes.tooltip, {
          [classes.withScroll]: !!maxHeight,
          [classes.lightTooltip]: isLightVariant,
          [classes.outlinedTooltip]: isOutlinedVariant,
        }),
        arrow: classNames(classes.arrow, classesProp?.arrow, {
          [classes.lightArrow]: isLightVariant,
          [classes.outlinedArrow]: isOutlinedVariant,
        }),
      }}
      {...restProps}
    />
  );
};
