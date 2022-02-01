import { Tooltip as MUITooltip, TooltipProps } from '@material-ui/core';
import classNames from 'classnames';
import { useTooltipStyles } from './useTooltipStyles';

interface ITooltipProps extends TooltipProps {
  maxHeight?: number;
}

export const Tooltip = ({ maxHeight, ...restProps }: ITooltipProps) => {
  const classes = useTooltipStyles({ maxHeight });

  return (
    <MUITooltip
      classes={{
        tooltip: classNames(
          classes.lightTooltip,
          !!maxHeight && classes.withScroll,
        ),
        arrow: classes.lightArrow,
      }}
      {...restProps}
    />
  );
};
