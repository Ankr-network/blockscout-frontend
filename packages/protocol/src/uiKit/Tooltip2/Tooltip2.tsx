import {
  Box,
  BoxProps,
  Tooltip,
  TooltipProps as DefaultTooltipProps,
} from '@material-ui/core';
import { useTooltip2Styles } from './Tooltip2Styles';
import { ReactComponent as InfoIcon } from 'uiKit/Icons/info.svg';

type Tooltip2Props = Omit<DefaultTooltipProps, 'children'> & {
  icon?: boolean;
  boxProps?: BoxProps;
  children?: React.ReactElement<any, any>;
};

export const Tooltip2 = ({
  arrow = true,
  placement = 'top',
  children,
  icon = true,
  boxProps,
  ...rest
}: Tooltip2Props) => {
  const classes = useTooltip2Styles();

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      arrow={arrow}
      placement={placement}
      {...rest}
    >
      {icon ? (
        <Box {...boxProps}>
          <InfoIcon fontSize={24} className={classes.tooltipIcon} />
        </Box>
      ) : (
        children || <div />
      )}
    </Tooltip>
  );
};
