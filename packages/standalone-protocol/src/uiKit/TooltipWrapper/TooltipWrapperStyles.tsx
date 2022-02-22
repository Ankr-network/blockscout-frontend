import { makeStyles } from '@material-ui/styles';
import { Theme, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const useTooltipWrapperStyles = makeStyles<Theme>(theme => ({
  tooltipItem: {
    display: 'inline-flex',
    alignItems: 'center',
    '&:hover $informationIcon': {
      color: 'black',
    },
  },
  informationIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(1),
    color: '#BFC6D0',
    transition: 'color .3s',
    width: 20,
    height: 20,
  },
}));

export const TooltipElement = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    color: 'rgb(31 34 38 / 52%)',
    boxShadow:
      '0px 0px 25px rgba(31, 34, 38, 0.1), 0px 5px 100px rgba(31, 34, 38, 0.15)',
    borderRadius: '21px',
    fontSize: 16,
    padding: theme.spacing(3),
  },
}))(Tooltip);
