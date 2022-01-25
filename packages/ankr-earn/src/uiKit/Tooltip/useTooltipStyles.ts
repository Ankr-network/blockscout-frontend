import { makeStyles, Theme } from '@material-ui/core';

export const useTooltipStyles = makeStyles<Theme>(theme => ({
  lightTooltip: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 13,
    boxShadow: '0px 2px 10px rgba(154, 161, 176, 0.3)',
    borderRadius: 12,
    border: 'none',
  },

  lightArrow: {
    color: theme.palette.background.paper,

    '&:before': {
      boxShadow: '0px 0px 2px rgba(154, 161, 176, 0.3)',
    },
  },
}));
