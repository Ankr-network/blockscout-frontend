import { Tooltip as MUITooltip, TooltipProps } from '@material-ui/core';
import { useTooltipStyles } from './useTooltipStyles';

interface ITooltipProps extends TooltipProps {}

export const Tooltip = ({ ...restProps }: ITooltipProps) => {
  const classes = useTooltipStyles();

  return (
    <MUITooltip
      classes={{
        tooltip: classes.lightTooltip,
        arrow: classes.lightArrow,
      }}
      {...restProps}
    />
  );
};
