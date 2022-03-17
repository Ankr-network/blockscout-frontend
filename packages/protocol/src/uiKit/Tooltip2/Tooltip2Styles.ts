import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useTooltip2Styles = makeStyles<Theme>(theme => ({
  tooltip: {
    backgroundColor: theme.palette.text.primary,
    boxShadow:
      '0px 0px 5px rgba(0, 0, 0, 0.15), 0px 0px 20px rgba(24, 48, 104, 0.1)',
    borderRadius: 12,
    padding: theme.spacing(1.5, 2),
    color: theme.palette.common.white,
  },
  arrow: {
    color: theme.palette.text.primary,
    '&:before': {
      borderRadius: 2,
    },
  },
  tooltipIcon: {
    color: theme.palette.grey[600],
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
